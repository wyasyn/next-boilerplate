import { Button } from "@/components/ui/button";
import { ArrowRightSquareIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" min-h-dvh grid place-items-center ">
      <div>
        <div className=" flex flex-col gap-3 items-center text-center ">
          <h2 className=" text-7xl text-red-500 ">404</h2>
          <p className=" text-xs ">Could not find requested resources</p>

          <Button variant="outline" size="sm">
            {" "}
            <Link href="/" className=" flex gap-2 items-center  ">
              Take Me Home <ArrowRightSquareIcon />{" "}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
