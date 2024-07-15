"use client";
import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInputForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sendSearch = async (formData: FormData) => {
    const search = formData.get("search") as string;

    try {
      setLoading(true);
      if (search) {
        router.push(`/product/search?s=${search}`);
      } else {
        router.push(`/product`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className=" border p-2 rounded-lg text-emerald-500 border-emerald-500 hover:border-emerald-300 duration-300 ease-in-out cursor-pointer "
      >
        <Search size={16} />
      </div>
      {open && (
        <>
          {" "}
          <div className=" fixed inset-0 bg-background/50 backdrop-blur-sm z-10 " />
          <form
            className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 "
            action={sendSearch}
          >
            <div className=" flex items-center justify-end mb-4 ">
              <div
                className=" p-2 cursor-pointer "
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </div>
            </div>
            <div className=" border px-3 py-1 bg-background rounded-xl w-[350px] flex gap-2 items-center focus-within:border-foreground/50 duration-300 ease-in-out ">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 size={16} className=" animate-spin " />
                ) : (
                  <Search size={16} />
                )}
              </button>
              <input
                className=" bg-transparent p-2 w-full focus-within:border-none focus:ring-0 focus:outline-none "
                name="search"
                tabIndex={1}
                autoFocus
                placeholder="Search product..."
              />
            </div>
          </form>
        </>
      )}
    </>
  );
}
