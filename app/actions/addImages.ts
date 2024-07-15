"use server";
import prisma from "@/lib/db";
import fs from "fs/promises";
import { randomUUID } from "crypto";
// Example: Add an image to a product
export async function addImageToProduct(productId: number, imageUrl: string) {
  const image = await prisma.image.create({
    data: {
      url: imageUrl,
      product: {
        connect: { id: productId },
      },
    },
  });
  return image;
}

// Example: Get all images for a product
export async function getProductImages(productId: number) {
  const images = await prisma.image.findMany({
    where: { productId },
  });
  return images;
}

// Example: Add an image to a user
export async function addImageToUser(userId: string, imageUrl: string) {
  const image = await prisma.image.create({
    data: {
      url: imageUrl,
      user: {
        connect: { id: userId },
      },
    },
  });
  return image;
}

// Example: Get all images for a user
export async function getUserImages(userId: string) {
  const images = await prisma.image.findMany({
    where: { userId },
  });
  return images;
}

// Example: Add an image to a supplier
export async function addImageToSupplier(
  supplierId: number,
  formData: FormData
) {
  const image = formData.get("image") as File;

  if (!image) {
    return {
      message: "No file sent",
    };
  }
  if (!supplierId) {
    return {
      message: "Id not sent",
    };
  }

  await fs.mkdir("public/uploads", { recursive: true });

  const imagePath = `/uploads/${randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );
  await prisma.image.create({
    data: {
      url: imagePath,
      supplier: {
        connect: { id: supplierId },
      },
    },
  });
  return {
    message: "Image saved successfully",
  };
}

// Example: Get all images for a supplier
export async function getSupplierImages(supplierId: number) {
  const images = await prisma.image.findMany({
    where: { supplierId },
  });
  return images;
}
