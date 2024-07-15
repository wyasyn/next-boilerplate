"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";
import { Category, Supplier } from "@prisma/client";
import { addProduct } from "@/app/actions/product";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type ProductFormProps = {
  categories: Category[];
  suppliers: Supplier[];
};

export default function ProductForm({
  categories,
  suppliers,
}: ProductFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  async function createProduct(formData: FormData) {
    const res = await addProduct(formData);

    if (res?.message) {
      toast({
        title: "Success",
        description: `${res.message}`,
      });
      router.refresh();
    }
    if (res?.error) {
      toast({
        title: "Error",
        description: `${res.error}`,
      });
    }
  }
  return (
    <form
      action={createProduct}
      className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 py-10"
    >
      <SubmitButton />
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>New product information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" type="text" className="w-full" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                className="min-h-32"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input name="price" id="price" type="text" className="w-full" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                name="quantity"
                id="quantity"
                type="text"
                className="w-full"
              />
            </div>
            {categories && (
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select name="categoryId">
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        className=" capitalize "
                        value={`${category.id}`}
                        key={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {suppliers && (
              <div className="grid gap-3">
                <Label htmlFor="supplier">Supplier</Label>
                <Select name="supplierId">
                  <SelectTrigger id="supplier" aria-label="Select supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem
                        className=" capitalize "
                        value={`${supplier.id}`}
                        key={supplier.id}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
