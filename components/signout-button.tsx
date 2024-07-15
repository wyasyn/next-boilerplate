import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function SignOutPage() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          className=" flex gap-1 w-full p-0 hover:bg-transparent hover:text-muted-foreground duration-300 ease-in-out "
        >
          <LogOut size={16} /> Logout
        </Button>
      </form>
    </>
  );
}
