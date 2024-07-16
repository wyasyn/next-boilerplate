"use client";

import { Product } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createOrder } from "@/app/actions/order";
import { useState } from "react";

export default function MakeOrderForm({ products }: { products: Product[] }) {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  async function makeOrder(formData: FormData) {
    const res = await createOrder(formData);

    if (res.success) {
      setSuccess(res.success);
    }
    if (res.error) {
      setError(res.error);
    }
  }
  return (
    <form action={makeOrder}>
      <div className=" w-full mb-3 flex items-center justify-end ">
        <Button type="submit" variant="outline" size="sm" className=" ml-auto ">
          Save Order
        </Button>
      </div>

      <Card x-chunk="dashboard-07-chunk-0">
        <CardContent>
          <div className=" flex flex-col ">
            {products && products.length > 0 && (
              <div className="grid gap-3 py-3">
                <Label htmlFor="productId">Product</Label>
                <Select name="productId">
                  <SelectTrigger id="productId" aria-label="Select product">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem
                        className=" capitalize "
                        value={`${product.id}`}
                        key={product.id}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-3 py-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                name="quantity"
                id="quantity"
                placeholder="10"
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
