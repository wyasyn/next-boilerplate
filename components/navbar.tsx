import Icon from "./icon";
import MoblieMenu from "./MoblieMenu";
import NavList from "./NavList";
import UserAvator from "./UserAvator";

export default function Navbar() {
  return (
    <header className=" flex items-center justify-between gap-10 bg-background/75 backdrop-blur-sm py-5 ">
      <MoblieMenu />
      <Icon />
      <NavList />
      <UserAvator />
    </header>
  );
}
