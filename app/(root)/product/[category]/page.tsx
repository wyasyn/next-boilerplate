import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table, TableHead, TableHeader } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategoryName } from "@/app/actions/product";
import DeleteProduct from "@/components/deleteProduct";

export default async function page({
  params: { category },
}: {
  params: { category: string };
}) {
  const categories = await getProductsByCategoryName(category);
  const products = categories[0].products;

  if (products.length === 0) {
    return (
      <div className=" p-[5rem] border rounded-xl bg-card flex items-center justify-center text-center ">
        <p className=" text-muted-foreground text-xl md:text-3xl ">
          No Products found!
        </p>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Quantity</TableHead>
              <TableHead className="hidden md:table-cell">Supplier</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <TableRow key={product.id} className=" capitalize ">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0].url
                          : "/placeholder.png"
                      }
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{product.name}</div>
                  </TableCell>
                  <TableCell>Shs. {product.price}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.quantity}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.supplier.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {categories[0].name}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel className=" text-center ">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            href={`/product/detail/${product.id}`}
                            className=" w-full "
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className=" w-full "
                            >
                              View
                            </Button>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DeleteProduct id={product.id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
