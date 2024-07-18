import Image from "next/image";
import { TableBody, TableCell, TableRow } from "./ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getSuppliers } from "@/app/actions/supplier";
import DeleteSupplier from "./deleteSupplier";
import PhoneNumberCell from "./PhoneNumberCell";

export default async function SupplierTable() {
  const suppliers = await getSuppliers();
  return (
    <TableBody>
      {suppliers.map((supplier) => (
        <TableRow key={supplier.id}>
          <TableCell className="hidden sm:table-cell">
            <Image
              alt={supplier.name}
              className="aspect-square rounded-md object-cover"
              height="64"
              src={
                supplier.images && supplier.images.length > 0
                  ? supplier.images[0].url
                  : "/user.png"
              }
              width="64"
            />
          </TableCell>
          <TableCell className="font-medium">{supplier.name}</TableCell>
          <PhoneNumberCell phoneNumber={supplier.contact} />
          <TableCell className="hidden md:table-cell">
            {new Date(supplier.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className=" text-center ">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={`/supplier/${supplier.id}`} className=" w-full ">
                    <Button variant="ghost" size="sm" className=" w-full ">
                      View
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteSupplier id={supplier.id} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
