"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInUser = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { username, password } = validatedFields.data;

  try {
    const signInData = await signIn("credentials", {
      username: username,
      password: password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
