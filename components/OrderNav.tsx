"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navData = [
  {
    name: "all",
    url: "/order",
  },
  {
    name: "pending",
    url: "/order/pending",
  },
  {
    name: "fullfilled",
    url: "/order/fullfilled",
  },
  {
    name: "declined",
    url: "/order/declined",
  },
];

export default function OrderNav() {
  const pathname = usePathname();

  return (
    <ul className=" flex items-center justify-center gap-3 flex-wrap ">
      {navData.map((item) => {
        const isActive = pathname === item.url;
        return (
          <li key={item.name}>
            <Link
              className={` capitalize hover:text-emerald-400 duration-300 ease-in-out ${
                isActive ? "text-foreground" : "text-muted-foreground"
              } `}
              href={item.url}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
