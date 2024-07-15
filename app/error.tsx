"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" min-h-dvh grid place-items-center ">
      <div className=" flex flex-col justify-center text-center p-4 rounded-lg border py-8 ">
        <h2 className=" mb-10 text-3xl font-semibold tracking-wide ">
          Something went wrong!
        </h2>
        <Button
          size="sm"
          variant="outline"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
