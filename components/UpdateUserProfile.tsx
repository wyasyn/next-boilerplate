"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUploader from "./uploader";
import { updateUserProfileImage } from "@/app/actions/addImages";
import { useRouter } from "next/navigation";

// Define the schema for a single file
const fileSchema = z.instanceof(File, {
  message: "File is required",
});

// Define the form schema with the image field
export const formSchema = z.object({
  image: z.array(fileSchema).refine((files) => files.length === 1, {
    message: "Exactly one image is required.",
  }),
});

export function UploadUserProfile({ id }: { id: string }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: [],
    },
  });

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedImage = values.image[0];

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      console.log(selectedImage);

      const res = await updateUserProfileImage(id, formData);
      if (res.message) {
        setMessage(res.message);
      }
      router.refresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage =
        (error as Error).message || "An unexpected error occurred.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-8 flex flex-col px-7 py-5"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploader
                  files={field.value as File[]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-800"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>
    </Form>
  );
}
