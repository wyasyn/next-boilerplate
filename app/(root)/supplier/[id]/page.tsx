import Image from "next/image";

import { Upload } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getSupplier } from "@/app/actions/supplier";
import NotFound from "@/app/not-found";
import EditSupplierForm from "@/components/editSupplier";
import { UploadSupplierImage } from "@/components/UploadSupplierImage";
import { DrawerDialogComponent } from "@/components/DrawerComponent";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const newId = parseInt(id);
  const supplier = await getSupplier(newId);
  if (!supplier) NotFound();
  if (supplier)
    return (
      <div className="flex min-h-screen w-full flex-col  py-[5rem]">
        <main className="grid flex-1 items-start gap-4  md:gap-8">
          <div className=" grid flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Edit {supplier.name}
              </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <EditSupplierForm
                id={supplier?.id}
                name={supplier?.name}
                contact={supplier?.contact}
              />

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {supplier.products && supplier.products.length > 0 && (
                  <Card>
                    <CardHeader>{supplier.name} products</CardHeader>
                    <CardContent className=" flex gap-1 flex-wrap ">
                      {supplier.products.map((item) => (
                        <Link
                          className=" text-muted-foreground "
                          href={`/product/detail/${item.id}`}
                          key={item.id}
                        >
                          {item.name}{" "}
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Supplier Images</CardTitle>
                    <CardDescription>
                      Photographs of the supplier
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {supplier.images && supplier.images.length > 0 ? (
                      <>
                        <div className="grid gap-2">
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={supplier.images[0].url}
                            width="300"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            {supplier.images.length > 1 &&
                              supplier.images.slice(1).map((image) => (
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
                              title="Supplier Image"
                              desc="JPG, PNG, GIF, JPEG"
                              component={
                                <UploadSupplierImage id={supplier.id} />
                              }
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
                        title="Supplier Image"
                        desc="JPG, PNG, GIF, JPEG"
                        component={<UploadSupplierImage id={supplier.id} />}
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
