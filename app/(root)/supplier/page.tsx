import { Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { DrawerDialogComponent } from "@/components/DrawerComponent";
import AddSupplierForm from "@/components/addSupplierForm";
import SupplierTable from "@/components/supplierTable";
import { Suspense } from "react";

export default function Supplier() {
  return (
    <div className=" py-[5rem] ">
      <div className=" flex items-center justify-end mb-10 ">
        <DrawerDialogComponent
          title="Add Supplier"
          desc="Supplier Information"
          trigger={
            <Button
              size="sm"
              variant="outline"
              className=" text-xs border border-emerald-500 text-emerald-500 duration-300 ease-in-out font-medium hover:text-emerald-800 hover:border-emerald-800 hover:bg-transparent rounded-lg "
              title="Add Category"
            >
              <span className=" hidden lg:block ">Add Supplier</span>
              <span className=" block lg:hidden ">
                <Truck size={16} />
              </span>
            </Button>
          }
          component={<AddSupplierForm />}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>
            Manage your suppliers and view their information.
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
                <TableHead>Contact</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <Suspense fallback="loading">
              <SupplierTable />
            </Suspense>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
