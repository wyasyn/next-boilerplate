import { getAllProducts } from "@/app/actions/product";

import { DrawerDialogComponent } from "@/components/DrawerComponent";
import MakeOrderForm from "@/components/MakeOrderForm";
import OrderNav from "@/components/OrderNav";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const products = await getAllProducts();
  return (
    <div className=" py-[5rem] ">
      <div className=" flex items-center justify-between mb-10 ">
        <OrderNav />
        <DrawerDialogComponent
          title="Make Order"
          desc="Order details"
          trigger={
            <Button
              size="sm"
              variant="outline"
              className=" text-xs border border-emerald-500 text-emerald-500 duration-300 ease-in-out font-medium hover:text-emerald-800 hover:border-emerald-800 hover:bg-transparent rounded-lg "
              title="Make Order"
            >
              <span className=" hidden lg:block ">Make Order</span>
              <span className=" block lg:hidden ">
                <Plus size={16} />
              </span>
            </Button>
          }
          component={<MakeOrderForm products={products} />}
        />
      </div>
      {children}
    </div>
  );
}
