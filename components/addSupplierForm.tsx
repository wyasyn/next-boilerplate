"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import "react-phone-number-input/style.css";
import PhoneInput, { Value } from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { addSupplier } from "@/app/actions/supplier";
import { useRouter } from "next/navigation";

// Define E164Number as a string type
type E164Number = string;

export const formSchema = z.object({
  name: z.string().min(3, {
    message: "Supplier name is required",
  }),
  contact: z.string().min(10, {
    message: "Contact is required",
  }),
});

export default function AddSupplierForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await addSupplier(values.name, values.contact);
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
        className="gap-8 flex flex-col px-7 py-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Supplier name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact</FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="UG"
                  placeholder="(256)-765-425-145"
                  international
                  withCountryCallingCode
                  className=" input-phone input-phone-input "
                  value={field.value as E164Number | undefined}
                  onChange={field.onChange as (value: Value) => void}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-800"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </Form>
  );
}
