"use server";
import prisma from "@/lib/db";
import fs from "fs/promises";
import { randomUUID } from "crypto";
// Example: Add an image to a product
export async function addImageToProduct(productId: number, formData: FormData) {
  const image = formData.get("image") as File;

  if (!image) {
    return {
      message: "No file sent",
    };
  }
  if (!productId) {
    return {
      message: "Id not sent",
    };
  }
  try {
    await fs.mkdir("public/uploads", { recursive: true });

    const imagePath = `/uploads/${randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
    await prisma.image.create({
      data: {
        url: imagePath,
        product: {
          connect: { id: productId },
        },
      },
    });
    return {
      message: "Image added successfully",
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
    };
  }
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

export async function updateUserCoverImage(userId: string, formData: FormData) {
  const image = formData.get("image") as File;

  if (!image) {
    return {
      message: "No file sent",
    };
  }
  if (!userId) {
    return {
      message: "Id not sent",
    };
  }
  try {
    await fs.mkdir("public/uploads", { recursive: true });

    const imagePath = `/uploads/${randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        coverImage: imagePath,
      },
    });
    return {
      message: "Cover image updated successfully",
    };
  } catch (error) {
    return {
      message: `Error: ${error}`,
    };
  }
}

export async function updateUserProfileImage(
  userId: string,
  formData: FormData
) {
  const image = formData.get("image") as File;

  if (!image) {
    return {
      message: "No file sent",
    };
  }
  if (!userId) {
    return {
      message: "Id not sent",
    };
  }
  try {
    await fs.mkdir("public/uploads", { recursive: true });

    const imagePath = `/uploads/${randomUUID()}-${image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    );
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profileImage: imagePath,
      },
    });
    return {
      success: "Cover image updated successfully",
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
    };
  }
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
