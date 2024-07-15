import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinksData } from "@/constants/userData";
import { Menu } from "lucide-react";
import NavItem from "./NavItem";

export default function MoblieMenu() {
  return (
    <div className=" md:hidden ">
      <Sheet>
        <SheetTrigger>
          <Menu size={20} />
        </SheetTrigger>
        <SheetContent>
          <ul className=" mt-8 flex flex-col gap-4 items-start ">
            {navLinksData.map((item) => (
              <NavItem key={item.name} {...item} />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
