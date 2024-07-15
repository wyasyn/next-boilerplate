"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import BackButton from "./BackButton";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div className="items-center justify-between gap-2 flex">
      <BackButton />
      <Button
        variant="outline"
        disabled={pending}
        type="submit"
        size="sm"
        className=" text-xs border border-emerald-500 text-emerald-500 duration-300 ease-in-out font-medium hover:text-emerald-800 hover:border-emerald-800 hover:bg-transparent rounded-lg "
      >
        {pending ? "adding..." : "Save Product"}
      </Button>
    </div>
  );
}
