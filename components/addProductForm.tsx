import { getAllCategories } from "@/app/actions/category";

import { getSuppliers } from "@/app/actions/supplier";

import ProductForm from "./ProductForm";

export default async function AddProductForm() {
  const categories = await getAllCategories();
  const suppliers = await getSuppliers();
  return <ProductForm categories={categories} suppliers={suppliers} />;
}
