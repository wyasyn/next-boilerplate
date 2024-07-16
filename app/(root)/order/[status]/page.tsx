import Link from "next/link";
import { Edit } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DrawerDialogComponent } from "@/components/DrawerComponent";
import UpdateOrderForm from "@/components/UpdateOrderForm";
import NotFound from "@/app/not-found";
import { getOrdersByStatus } from "@/app/actions/order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function page({
  params: { status },
}: {
  params: { status: string };
}) {
  const statusName = status.toUpperCase();
  if (!statusName) NotFound();
  const orders = await getOrdersByStatus(statusName as OrderStatus);
  if (orders.length == 0) {
    return (
      <div className=" px-5 py-3 text-center border rounded-xl bg-secondary/50 backdrop-blur-sm ">
        No orders found
      </div>
    );
  }
  return (
    <Card className=" flex-1 ">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders made by your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead className="hidden sm:table-cell">Quantity</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={`/supplier/${order.product.supplierId}`}>
                    <div className="font-medium">
                      {order.product.supplier.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.product.name}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.quantity}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={` px-3 py-1 rounded-full capitalize text-xs tracking-wide font-semibold ${
                      order.status === OrderStatus.PENDING
                        ? " bg-orange-300 text-orange-800  "
                        : order.status === OrderStatus.FULLFILLED
                        ? " bg-emerald-300 text-emerald-800 "
                        : " bg-red-300 text-red-800 "
                    } `}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DrawerDialogComponent
                    desc={`Supplier ${order.product.supplier.name}`}
                    component={<UpdateOrderForm order={order} />}
                    title={`Update ${order.id}`}
                    trigger={
                      <span className=" cursor-pointer flex items-center justify-end gap-2 ">
                        sh {order.total} <Edit size={16} />{" "}
                      </span>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
