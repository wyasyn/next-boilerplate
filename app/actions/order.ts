"use server";

import prisma from "@/lib/db";

export async function createOrder(productId: number, quantity: number) {
  try {
    // Fetch the product to get the price
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
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

    console.log("Order created:", newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function editOrder(orderId: number, quantity: number) {
  try {
    // Fetch the existing order to check if it exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // Fetch the product to get the price
    const product = await prisma.product.findUnique({
      where: { id: existingOrder.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // Calculate new total price
    const total = product.price * quantity;

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        quantity,
        total,
      },
    });

    console.log("Order updated:", updatedOrder);
    return updatedOrder;
  } catch (error) {
    console.error("Error editing order:", error);
    throw error;
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
