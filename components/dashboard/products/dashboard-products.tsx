"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/lib/schema";
import Image from "next/image";
import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { EllipsisIcon, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useProductData from "@/hooks/use-products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductsForm from "./components/products-form";
import mongoose from "mongoose";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api";

export default function DashboardProducts() {
  const {
    data: products,
    error: productError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const { getCategories, getSubCategories, getStoneNames } = useProductData(products);

  if (productError) {
    toast({
      title: "Failed to fetch products!",
      description: productError.message,
      variant: "destructive",
    });
  }
  const handleDelete = async (id: mongoose.Types.ObjectId) => {
    const res = await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast({
        title: "Error!!!",
        description: "Failed to delete the product",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    }

    console.log(res);
  };

  return (
    <main className="container">
      <div className=" flex justify-between">
        <h1 className="text-2xl font-bold uppercase mb-6">
          <span className="underline">Products</span> &#40; {products?.length} &#41;
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add new product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Products</DialogTitle>
              <DialogDescription>Fill in the details for adding a new product.</DialogDescription>
            </DialogHeader>
            <ProductsForm
              categories={getCategories()}
              subCategories={getSubCategories()}
              stoneNames={getStoneNames()}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Fetched Products from DB */}
      <div>
        {isLoading ? (
          <div className=" min-h-96 flex w-full flex-col items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : products?.length === 0 ? (
          <div className=" min-h-96 flex w-full flex-col items-center justify-center">
            <>
              <p>No products found</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add new product</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Products</DialogTitle>
                    <DialogDescription>Fill in the details for adding a new product.</DialogDescription>
                  </DialogHeader>
                  <ProductsForm
                    categories={getCategories()}
                    subCategories={getSubCategories()}
                    stoneNames={getStoneNames()}
                  />
                </DialogContent>
              </Dialog>
            </>
          </div>
        ) : (
          products?.map((product: IProduct, index: number) => (
            <Card key={product.id || index} className="group">
              <CardHeader className="">
                <div className="flex justify-between items-start">
                  {/* Name & Product Code */}
                  <div className="flex flex-col gap-2">
                    <CardTitle className="flex items-center gap-1 text-2xl">
                      {product.name}

                      <DropdownMenu>
                        <DropdownMenuTrigger className="group-hover:opacity-100 hover:text-neutral-700 p-1 opacity-0 hover:bg-neutral-100 rounded-lg cursor-pointer ">
                          <EllipsisIcon className="" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className=" space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="secondary">
                                <Pencil />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit {`${product.productCode}`}</DialogTitle>
                                <DialogDescription>Edit the details for {`${product.name}`}</DialogDescription>
                              </DialogHeader>
                              <ProductsForm
                                categories={getCategories()}
                                edit={product}
                                stoneNames={getStoneNames()}
                                subCategories={getSubCategories()}
                              />
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">
                                <Trash2 /> Delete
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Permanently delete {`${product.name} (${product.productCode})`}?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. Are you sure you want to delete this product?
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(product._id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription>
                      {product.tags.map((tag, index) => (
                        <span key={index}>
                          {tag}
                          {index !== product.tags.length - 1 && ", "}
                        </span>
                      ))}
                    </CardDescription>
                  </div>

                  <div className="flex justify-between flex-col gap-1">
                    {/* Product Code */}
                    <Badge>{product.productCode}</Badge>

                    {/* Featured Badge */}
                    {product.isFeatured && <Badge className="bg-blue-700 hover:bg-blue-700/80">Featured</Badge>}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                {/* Description */}
                <p>{product.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {/* Stone Name */}
                  <p>
                    <strong>Stone name:</strong> {product.stoneName}
                  </p>

                  {/* Created Date */}
                  <p>
                    <strong>Created at:</strong>{" "}
                    {product.createdAt ? format(new Date(product.createdAt), "PPp") : "N/A"}
                  </p>

                  {/* Category / Subcategory */}
                  <p>
                    <strong>Category / Subcategory:</strong> {product.category} / {product.subCategory}
                  </p>

                  {/* Last Updated Date */}
                  <p>
                    <strong>Last updated at:</strong>{" "}
                    {product.updatedAt ? format(new Date(product.updatedAt), "PPp") : "N/A"}
                  </p>
                </div>

                {/* Images */}
                <div className="flex gap-2">
                  {product.images.map((item, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger>
                        <Image
                          className="bg-neutral-200 rounded-lg overflow-hidden"
                          src={item.image}
                          alt={product.name + (index + 1)}
                          width={100}
                          height={100}
                        />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <Image
                          className="bg-neutral-200 rounded-lg overflow-hidden"
                          src={item.image}
                          alt={product.name + (index + 1)}
                          width={600}
                          height={600}
                        />
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
