"use server";
import fs from "fs/promises";
import { addImageToUser } from "./addImages";
import { randomUUID } from "crypto";

export async function addImage(formData: FormData) {
  const userId = formData.get("userId");
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

  await fs.mkdir("public/uploads", { recursive: true });

  const imagePath = `/uploads/${randomUUID()}-${image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await image.arrayBuffer())
  );

  await addImageToUser(userId.toString(), imagePath);

  return {
    message: "Image saved successfully",
  };
}
