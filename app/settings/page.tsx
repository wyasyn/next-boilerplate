import { auth } from "@/auth";
import { DrawerDialogComponent } from "@/components/DrawerComponent";
import { Button } from "@/components/ui/button";
import { UploadUserCover } from "@/components/UpdateUserCover";
import UpdateUserForm from "@/components/UpdateUserForm";
import { UploadUserProfile } from "@/components/UpdateUserProfile";
import prisma from "@/lib/db";
import { EditIcon, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    redirect("/login");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <section className="  py-8 min-h-screen text-muted-foreground ">
      <div className=" bg-background max-w-screen-md mx-auto p-8 rounded-xl ">
        <div className=" flex items-center justify-end ">
          <Link
            href="/"
            className=" p-2 hover:text-foreground duration-300 ease-in-out "
            title="Back home"
          >
            <Home size={16} />
          </Link>
        </div>
        <div>
          <div className=" relative w-full min-h-[200px] md:min-h-[250px] rounded-xl group ">
            <Image
              src={user?.coverImage ? user.coverImage : "/placeholder.png"}
              alt="cover image"
              className=" object-cover rounded-xl "
              fill
            />
            <DrawerDialogComponent
              title="Cover Image Update"
              desc="Select a clear image"
              component={<UploadUserCover id={userId} />}
              trigger={
                <div
                  className=" absolute bg-background/20 p-2 rounded-lg inset-0 place-items-center cursor-pointer backdrop-blur-sm hidden group-hover:grid "
                  title="Edit cover image"
                >
                  <Button variant="outline" size="sm">
                    <EditIcon size={16} />
                  </Button>
                </div>
              }
            />
          </div>
          <div className=" ring ring-background ml-[20px] -mt-[40px] relative aspect-square w-[80px] h-[80px] rounded-full group ">
            <Image
              src={user?.profileImage ? user.profileImage : "/user.png"}
              alt="profile image"
              className=" object-cover rounded-full "
              fill
            />
            <DrawerDialogComponent
              title="Cover Image Update"
              desc="Select a clear image"
              component={<UploadUserProfile id={userId} />}
              trigger={
                <div
                  className=" absolute bg-background/20 p-2 rounded-full inset-0 place-items-center cursor-pointer backdrop-blur-sm hidden group-hover:grid "
                  title="Edit profile image"
                >
                  <Button variant="outline" size="sm">
                    <EditIcon size={16} />
                  </Button>
                </div>
              }
            />
          </div>
          <div className=" ml-[120px] -mt-[30px] ">
            <h1 className=" text-foreground text-xl capitalize ">
              {user?.firstName} {user?.lastName}
            </h1>
            <p>{user?.role}</p>
          </div>
        </div>
        <div className=" py-8 ">
          <UpdateUserForm
            id={userId}
            firstName={user?.firstName || "First name"}
            lastName={user?.lastName || "Last Name"}
            username={user?.username || "Username"}
            email={user?.email || "email.example.com"}
            bio={user?.bio || "A brief bio"}
          />
        </div>
      </div>
    </section>
  );
}
