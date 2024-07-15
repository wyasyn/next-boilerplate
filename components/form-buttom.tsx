"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function FormButton({ name }: { name: string }) {
    const { pending } = useFormStatus();
    return (
        <Button
            size="sm"
            className=" flex items-center justify-center w-full "
            disabled={pending}
            type="submit"
        >
            {pending ? (
                <span className=" flex items-center gap-2 ">
                    <Loader2 className=" w-4 h-4 animate-spin " />
                    <p>Please wait...</p>
                </span>
            ) : (
                <p>{name}</p>
            )}
        </Button>
    );
}
