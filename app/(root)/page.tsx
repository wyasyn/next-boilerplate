import { DollarSign, ShoppingBasket, ShoppingCart, Truck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChartComponent } from "@/components/AreaChart";
import { PieChartComponent } from "@/components/PieChart";
import prisma from "@/lib/db";

export default async function page() {
  const productCount = await prisma.product.count();
  const supplierCount = await prisma.supplier.count();
  const orderCount = await prisma.order.count();
  const categoryCount = await prisma.category.count();
  const costOnProducts = await prisma.product.aggregate({
    _sum: {
      price: true,
      quantity: true,
    },
  });

  return (
    <div className=" py-12 ">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              + {costOnProducts._sum.quantity || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Product types - {productCount || 0} : Categories -{" "}
              {categoryCount || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ {orderCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Orders made this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Suppliers
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+ {supplierCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Available to make order
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Shs {costOnProducts._sum.price || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Amount spent on product
            </p>
          </CardContent>
        </Card>
      </div>
      <div className=" mt-[5rem] grid gap-10 md:grid-cols-3">
        <div className=" w-full md:col-span-2 ">
          <AreaChartComponent />
        </div>
        <div className=" w-full md:col-span-1 ">
          <PieChartComponent />
        </div>
      </div>
    </div>
  );
}
