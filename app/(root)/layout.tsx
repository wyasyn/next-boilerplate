import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userId = session?.user.id;

  const adminUser = session?.user.role === "ADMIN";

  if (!userId && !adminUser) {
    redirect("/login");
  }
  return (
    <div className=" container ">
      <Navbar />
      <main> {children} </main>
    </div>
  );
}
