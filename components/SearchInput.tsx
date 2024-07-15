import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className=" hidden md:flex border min-w-[250px] py-2 px-3 rounded-xl bg-secondary border-primary/15 hover:border-primary/35 duration-300 ease-in-out items-center justify-start gap-2 ">
      <Search size={16} />{" "}
      <span className=" text-muted-foreground ">Search product...</span>
    </div>
  );
}
