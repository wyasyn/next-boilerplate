import Image from "next/image";

import { Upload } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BackButton from "@/components/BackButton";
import { getProductById } from "@/app/actions/product";
import NotFound from "@/app/not-found";
import EditProductForm from "@/components/editProductForm";
import { DrawerDialogComponent } from "@/components/DrawerComponent";
import { UploadProductImage } from "@/components/UploadProductImage";

export default async function page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const newId = parseInt(productId);
  const product = await getProductById(newId);
  if (!product) NotFound();
  if (product) {
    return (
      <div className="flex min-h-screen w-full flex-col  pb-[5rem]">
        <main className="grid flex-1 items-start gap-4  md:gap-8">
          <div className=" grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Edit {product.name}
              </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <EditProductForm
                id={product?.id}
                name={product?.name}
                description={product?.description!}
                price={product.price!}
                quantity={product.quantity!}
              />
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>
                      Photographs of the product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {product.images && product.images.length > 0 ? (
                      <>
                        <div className="grid gap-2">
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={product.images[0].url}
                            width="300"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            {product.images.length > 1 &&
                              product.images.slice(1).map((image) => (
                                <button key={image.id}>
                                  <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src={image.url}
                                    width="84"
                                  />
                                </button>
                              ))}

                            <DrawerDialogComponent
                              title="Product Image"
                              desc="JPG, PNG, GIF, JPEG"
                              component={<UploadProductImage id={product.id} />}
                              trigger={
                                <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                  <span className="sr-only">Upload</span>
                                </button>
                              }
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <DrawerDialogComponent
                        title="Product Image"
                        desc="JPG, PNG, GIF, JPEG"
                        component={<UploadProductImage id={product.id} />}
                        trigger={
                          <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                          </button>
                        }
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
