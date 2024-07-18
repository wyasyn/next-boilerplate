import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import Link from "next/link";
import { Settings } from "lucide-react";
import SignOutPage from "./signout-button";
import { ModeToggle } from "./modeToggle";

export default async function UserAvator() {
  const session = await auth();
  const profileImage = session?.user.profileImage;
  const firstName = session?.user.firstName;
  const lastName = session?.user.lastName;
  if (!session) return;
  return (
    <div className=" flex items-center justify-end gap-1 ">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar title={firstName + " " + lastName}>
            <AvatarImage src={profileImage ? profileImage : "/user.png"} />
            <AvatarFallback>{firstName[0] + lastName[0]}N</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/settings" className=" flex items-center gap-1 w-full ">
              <Settings size={16} /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutPage />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
