"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "@/app/actions/product";
import { useToast } from "./ui/use-toast";

export default function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={loading}
      className=" w-full "
      onClick={async () => {
        try {
          setLoading(true);
          const res = await deleteProduct(id);
          if (res.success) {
            toast({
              title: "Success",
              description: `${res.success}`,
            });
          }
          if (res?.error) {
            toast({
              title: "Error",
              description: `${res.error}`,
            });
          }
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
