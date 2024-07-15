"use server";
import prisma from "@/lib/db";

export const addCategory = async (name: string) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    console.log("Category added:", newCategory);
    return {
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getCategoryById = async (categoryId: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    return category;
  } catch (error) {
    console.error("Error getting category by ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const updateCategory = async (categoryId: number, name: string) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });
    return updatedCategory;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: { id: categoryId },
    });
    return deletedCategory;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
