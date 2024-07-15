"use client";

import { deleteSupplier } from "@/app/actions/supplier";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteSupplier({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      className=" w-full "
      onClick={async () => {
        try {
          setLoading(true);
          await deleteSupplier(id);
          router.refresh();
        } catch (error) {
          console.log(error as string);
          throw new Error();
        } finally {
          setLoading(false);
        }
      }}
    >
      {loading ? "Deleting" : "Delete"}
    </Button>
  );
}
