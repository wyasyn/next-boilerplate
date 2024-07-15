import CategoryNav from "@/components/categoryNav";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { categoryData } from "@/constants/userData";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <section>
      <nav className=" my-10 flex justify-between items-center gap-4 py-4 ">
        <ul className=" flex gap-x-2 items-center justify-start flex-wrap text-xs ">
          {categoryData.map((item) => (
            <CategoryNav key={item.name} {...item} />
          ))}
        </ul>
        <SearchInput />
        <ul className=" flex items-center gap-2 justify-end ">
          <li>
            <Button
              size="icon"
              variant="ghost"
              className=" border-none md:hidden text-xs border border-emerald-500 text-emerald-500 duration-300 ease-in-out font-medium hover:border-emerald-400 hover:text-emerald-300 hover:bg-transparent rounded-full "
              title="Search Product"
            >
              <span className=" block lg:hidden ">
                <Search size={16} />
              </span>
            </Button>
          </li>

          <li>
            <Link href="/add-product">
              {" "}
              <Button
                size="sm"
                variant="outline"
                className=" text-xs border border-emerald-500 text-emerald-500 duration-300 ease-in-out font-medium hover:text-emerald-800 hover:border-emerald-800 hover:bg-transparent rounded-lg "
                title="Add Product"
              >
                <span className=" hidden lg:block ">Add Product</span>
                <span className=" block lg:hidden ">
                  <Plus size={16} />
                </span>
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </section>
  );
}
