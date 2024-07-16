"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addSupplier(name: string, contact: string) {
  try {
    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        contact,
      },
    });
    revalidatePath("/supplier");
    console.log("Supplier added:", newSupplier);
    return {
      message: `Supplier ${newSupplier.name} added successfully`,
    };
  } catch (error) {
    console.error("Error adding supplier:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSuppliers() {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        images: true,
        products: true,
      },
    });
    return suppliers;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSupplier(id: number) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
        products: true,
      },
    });
    return supplier;
  } catch (error) {
    console.error("Error fetching supplier:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateSupplier(
  id: number,
  name: string,
  contact: string
) {
  try {
    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        contact,
      },
    });
    revalidatePath("/supplier");
    return { message: `${updatedSupplier.name} updated successfully` };
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteSupplier(id: number) {
  try {
    const deletedSupplier = await prisma.supplier.delete({
      where: { id },
    });
    return deletedSupplier;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
