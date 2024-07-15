"use server";

import prisma from "@/lib/db";

export const addProduct = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const quantity = formData.get("quantity") as string;
  const categoryId = formData.get("categoryId") as string;
  const supplierId = formData.get("supplierId") as string;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        category: {
          connect: { id: parseInt(categoryId, 10) },
        },
        supplier: {
          connect: { id: parseInt(supplierId, 10) },
        },
      },
    });
    return {
      message: "Product created successfully",
    };
  } catch (error: any) {
    return {
      error: "Failed to create product",
    };
  } finally {
    await prisma.$disconnect();
  }
};

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: true,
        images: true,
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteProduct(productId: number) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return {
      success: "Product deleted successfully",
    };
  } catch (error) {
    return {
      error,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function editProduct(productId: number, updatedData: any) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updatedData,
    });

    console.log("Product updated:", updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductById(productId: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        supplier: true,
        images: true,
        category: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductsByCategory(categoryId: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        supplier: true,
        images: true,
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getProductsByCategoryName(category: string) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        name: category,
      },
      include: {
        products: {
          include: {
            images: true,
            supplier: true,
          },
        },
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductsBySupplier(supplierId: number) {
  try {
    const products = await prisma.product.findMany({
      where: {
        supplierId,
      },
      include: {
        supplier: true,
        images: true,
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by supplier ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getProductsBySearch(searchTerm: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        supplier: true,
        images: true,
        category: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by search term:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
