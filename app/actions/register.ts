"use server";

import prisma from "@/lib/db";
import { registrationSchema } from "@/lib/zod";
import { hash } from "bcryptjs";
import { z } from "zod";

export const registerUser = async (
  values: z.infer<typeof registrationSchema>
) => {
  const validatedFields = registrationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { username, password, password2, firstName, lastName, email } =
    validatedFields.data;

  if (password != password2) {
    return {
      error: "Passwords don't match",
    };
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUsername) {
    return {
      error: "Username not unique, try another",
    };
  }

  const existingUserEmail = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUserEmail) {
    return {
      error: "An error occurred, please try again",
    };
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const { password: newUserPassword, ...rest } = newUser;

  return {
    user: rest,
    success: "User created successfully",
  };
};
