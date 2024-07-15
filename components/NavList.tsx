import NavItem from "./NavItem";
import { navLinksData } from "@/constants/userData";

export default function NavList() {
  return (
    <ul className=" hidden md:flex items-center justify-center gap-2 ">
      {navLinksData.map((item) => (
        <NavItem
          key={item.name}
          name={item.name}
          url={item.url}
          icon={item.icon}
        />
      ))}
    </ul>
  );
}
