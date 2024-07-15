"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({
  name,
  icon,
  url,
}: {
  name: string;
  icon: string;
  url: string;
}) {
  const pathname = usePathname();

  const isActive = pathname === url;
  return (
    <li>
      <Link
        href={url}
        className={` p-1 capitalize flex flex-col items-center justify-center hover:text-foreground duration-300 ease-in-out ${
          isActive ? "text-emerald-500" : "text-muted-foreground"
        } `}
      >
        <span className={`${isActive ? "opacity-100" : "opacity-0"}`}>
          {icon}
        </span>
        <span>{name}</span>
      </Link>
    </li>
  );
}
