"use client";

import { Order, OrderStatus } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { editOrder } from "@/app/actions/order";

export default function UpdateOrderForm({ order }: { order: Order }) {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  async function editOrderClient(formData: FormData) {
    try {
      const res = await editOrder(formData);
      if (res.success) {
        setSuccess(res.success);
      }
      if (res.error) {
        setError(res.error);
      }
    } catch (error) {
      throw new Error();
    }
  }
  return (
    <form action={editOrderClient}>
      <div className=" w-full mb-3 flex items-center justify-end ">
        <Button type="submit" variant="outline" size="sm" className=" ml-auto ">
          Save Order
        </Button>
        <input name="orderId" type="hidden" value={order.id} />
      </div>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardContent>
          <div className=" flex flex-col gap-6 ">
            <div className="grid gap-3 py-3">
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger id="status" aria-label="Select product">
                  <SelectValue placeholder={order.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={OrderStatus.FULLFILLED}>
                    FULLFILLED
                  </SelectItem>
                  <SelectItem value={OrderStatus.PENDING}>PENDING</SelectItem>
                  <SelectItem value={OrderStatus.DECLINED}>DECLINED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 py-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                name="quantity"
                id="quantity"
                defaultValue={order.quantity}
                type="text"
                className="w-full"
              />
            </div>
          </div>
          {success && (
            <p className=" border border-emerald-500 bg-emerald-300 font-semibold text-emerald-800 px-3 py-2 rounded-lg mt-8 ">
              {success}
            </p>
          )}

          {error && (
            <p className=" border border-red-500 bg-red-300 font-semibold text-red-800 px-3 py-2 rounded-lg mt-8 ">
              {error}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
