import ProductTable from "@/components/ProductTable";

import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback="loading">
      <ProductTable />
    </Suspense>
  );
}
