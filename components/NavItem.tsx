"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function NavItem({
  name,
  icon,
  url,
}: {
  name: string;
  icon: ReactElement;
  url: string;
}) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={url}
        className={` flex items-center border gap-1 capitalize px-3 py-1 rounded-xl ${
          url === pathname
            ? "text-foreground bg-secondary/50"
            : "text-muted-foreground"
        } hover:border-emerald-500/50 duration-300 ease-out group `}
      >
        <span
          className={`${
            url === pathname && "text-emerald-500"
          } group-hover:text-emerald-500/50`}
        >
          {icon}
        </span>{" "}
        {name}
      </Link>
    </li>
  );
}
