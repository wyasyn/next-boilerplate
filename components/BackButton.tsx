"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <div
      className="h-7 w-7 border flex items-center justify-center cursor-pointer rounded-md hover:border-foreground duration-300 ease-in-out"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </div>
  );
}
