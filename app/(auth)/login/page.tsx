"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { signInUser } from "@/app/actions/login";
import Link from "next/link";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const { pending } = useFormStatus();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setError("");

    const res = await signInUser(values);

    if (res?.error) {
      setError(error);
    }
    form.reset();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your username below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="JonnyP" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="**********"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className=" bg-destructive px-4 py-2 rounded-lg text-destructive-foreground ">
                  Error occurred
                </p>
              )}

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </CardContent>

            <CardFooter>
              <Button disabled={pending} type="submit" className="w-full">
                {pending ? (
                  <span className=" flex items-center gap-2 text-muted ">
                    <Loader2 className=" w-4 h-4 animate-spin " />
                    <p>Please wait...</p>
                  </span>
                ) : (
                  <p>Sign in</p>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
