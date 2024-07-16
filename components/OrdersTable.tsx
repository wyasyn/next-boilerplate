import { getAllOrders } from "@/app/actions/order";

import { TableBody, TableCell, TableRow } from "./ui/table";
import Link from "next/link";
import { Edit } from "lucide-react";
import { OrderStatus } from "@prisma/client";
import { DrawerDialogComponent } from "./DrawerComponent";
import UpdateOrderForm from "./UpdateOrderForm";

export default async function OrdersTable() {
  const orders = await getAllOrders();
  if (!orders)
    return <div className=" px-5 py-3 border ">No orders made yet!</div>;
  if (orders)
    return (
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <Link href={`/supplier/${order.product.supplierId}`}>
                <div className="font-medium">{order.product.supplier.name}</div>
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
    );
}
