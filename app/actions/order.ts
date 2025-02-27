"use server";

import prisma from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData) {
  const productIdInput = formData.get("productId") as string;
  const quantityInput = formData.get("quantity") as string;

  const productId = parseInt(productIdInput);
  const quantity = parseInt(quantityInput);
  try {
    // Fetch the product to get the price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return {
        error: "Product does not exist in the database",
      };
    }

    // Calculate total price
    const total = product.price * quantity;

    // Create the order
    const newOrder = await prisma.order.create({
      data: {
        productId,
        quantity,
        total,
      },
    });

    revalidatePath("/order");

    return {
      success: "Order made successfully",
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function editOrder(formData: FormData) {
  const orderIdInput = formData.get("orderId") as string;
  const quantityInput = formData.get("quantity") as string;
  const status = formData.get("status") as OrderStatus;
  const orderId = parseInt(orderIdInput);
  const quantity = parseInt(quantityInput);
  if (!orderIdInput || !quantityInput || !status)
    return {
      error: "Invalid inputs",
    };
  try {
    // Fetch the existing order to check if it exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return {
        error: "Order not found",
      };
    }

    // Fetch the product to get the price
    const product = await prisma.product.findUnique({
      where: { id: existingOrder.productId },
    });

    if (!product) {
      return {
        error: "Product not found",
      };
    }

    // Calculate new total price
    const total = product.price * quantity;

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        quantity,
        status,
        total,
      },
    });

    revalidatePath("/order");

    return {
      success: "Order update successful",
    };
  } catch (error) {
    return {
      error: `Error: ${error}`,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteOrder(orderId: number) {
  try {
    // Check if the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // Delete the order
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    console.log("Order deleted:", deletedOrder);
    return deletedOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        product: {
          include: {
            supplier: true,
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOrderById(orderId: number) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        product: {
          include: {
            supplier: true,
            images: true,
          },
        },
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOrdersByProductId(productId: number) {
  try {
    const orders = await prisma.order.findMany({
      where: { productId },
      include: {
        product: {
          include: {
            supplier: true,
            images: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders by product ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOrdersByStatus(status: OrderStatus) {
  try {
    const orders = await prisma.order.findMany({
      where: { status },
      include: {
        product: {
          include: {
            supplier: true,
            images: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders by product ID:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
