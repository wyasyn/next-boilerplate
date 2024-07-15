"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { updateSupplier } from "@/app/actions/supplier";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Supplier name is required",
  }),
  contact: z.string().min(10, {
    message: "Contact is required",
  }),
});
export default function EditSupplierForm({
  id,
  name,
  contact,
}: {
  id: number;
  name: string;
  contact: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      contact: contact,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await updateSupplier(id, values.name, values.contact);
      if (res.message) {
        setMessage(res.message);
      }
      router.refresh();
    } catch (error) {
      setMessage(error as string);
    } finally {
      form.reset();
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8"
      >
        <div className="items-center justify-end gap-2 ml-auto flex">
          <Link className=" border rounded-lg py-2 px-3 " href="/supplier">
            Discard
          </Link>
          <Button disabled={loading} type="submit" size="sm">
            {loading ? "Saving" : "Save Supplier"}
          </Button>
        </div>
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Supplier Details</CardTitle>
            <CardDescription>Information about the supplier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </Form>
  );
}
