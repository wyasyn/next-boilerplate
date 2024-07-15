"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

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

export const updateUser = async (userId: string, data: Partial<User>) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
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
