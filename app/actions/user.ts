"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getUserById = async function getUserWithImages(userId: string) {
  try {
    const userWithImages = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        images: true,
      },
    });

    return userWithImages;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        images: true,
      },
    });
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return `User with ID ${userId} deleted successfully`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUser = async (userId: string, formData: FormData) => {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const bio = formData.get("bio") as string;
  if (!userId) {
    return {
      error: "No user selected",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        firstName,
        lastName,
        bio,
      },
    });
    revalidatePath("/settings");
    return {
      success: "Information updated successfully",
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
    };
  }
};

export const createUser = async (data: User) => {
  try {
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
