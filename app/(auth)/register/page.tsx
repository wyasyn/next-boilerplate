"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { registrationSchema } from "@/lib/zod";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { registerUser } from "@/app/actions/register";

export default function RegisterForm() {
  const { pending } = useFormStatus();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      password2: "",
    },
  });
  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    setError("");
    setSuccess("");

    const res = await registerUser(values);

    if (res?.error) {
      setError(res.error);
    }
    if (res?.success) {
      setSuccess(res.success);
    }
    form.reset();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="John" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Mukisa" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="JMukisa" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="me@example.com"
                          {...field}
                        />
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
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <p className=" bg-destructive px-4 py-2 rounded-lg text-destructive-foreground ">
                    {error}
                  </p>
                )}

                {success && (
                  <p className=" bg-emerald-400 px-4 py-2 rounded-lg text-emerald-900 font-medium ">
                    {success}
                  </p>
                )}

                <Button disabled={pending} type="submit" className="w-full">
                  {pending ? (
                    <span className=" flex items-center gap-2 text-muted ">
                      <Loader2 className=" w-4 h-4 animate-spin " />
                      <p>Please wait...</p>
                    </span>
                  ) : (
                    <p className=" font-medium tracking-wide ">
                      Create account
                    </p>
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
