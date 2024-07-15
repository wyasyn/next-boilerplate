import { StoreIcon } from "lucide-react";
import Link from "next/link";

export default function Icon() {
  return (
    <Link
      href="/"
      className=" font-medium text-lg flex items-center gap-2 group hover:text-emerald-500 duration-300 ease-in-out "
    >
      <span className=" text-emerald-500 group-hover:text-muted-foreground ">
        <StoreIcon size={18} />
      </span>{" "}
      <span>Inventor</span>
    </Link>
  );
}
