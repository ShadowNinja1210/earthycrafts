"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INewProduct } from "@/lib/schema";
import Image from "next/image";
import { format } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { ObjectId } from "mongoose";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api";
import { useState } from "react";
import FilterSort from "./components/filter-sort";
import { staticPrimaryCategories, staticSecondaryCategories } from "@/public/assets/some-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardProducts() {
  const {
    data: products,
    error: productError,
    isLoading,
  } = useQuery({
    queryKey: ["dashboardProducts"],
    queryFn: fetchAllProducts,
  });

  // UseStates
  const [addOpen, setAddOpen] = useState(false); // Add Dialog
  const [editOpen, setEditOpen] = useState<{ isOpen: boolean; productCode?: string }>({ isOpen: false }); // Edit Dialog for a specific product
  const [filteredSortedProducts, setFilteredSortedProducts] = useState<INewProduct[]>(products || []); // Filtered and Sorted Products

  // Getting the  subcategories, and stone names from the fetched products
  const { primaryCategories, secondaryCategories, subCategories, stoneNames } = useProductData(products);

  // Merge the arrays
  const mergedSecondaryCategories = [...new Set([...staticSecondaryCategories, ...secondaryCategories])];
  const mergedPrimaryCategories = [...new Set([...staticPrimaryCategories, ...primaryCategories])];

  // Giving toast When there's an error while fetching the products
  if (productError) {
    toast({
      title: "Failed to fetch products!",
      description: productError.message,
      variant: "destructive",
    });
  }

  // Function to delete the product
  const handleDelete = useMutation<void, unknown, ObjectId>({
    mutationKey: ["dashboardProducts"],
    mutationFn: async (id) => {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error!!!",
        description: "Failed to delete the product",
        variant: "destructive",
      });
    },
  });

  return (
    <main className="container">
      {/* Heading of the page */}
      <div className=" flex justify-between">
        <h1 className="text-2xl font-bold uppercase mb-6">
          <span className="underline">Products</span> &#40; {filteredSortedProducts?.length} &#41;
        </h1>

        <div className="flex gap-2">
          {isLoading ? (
            <Skeleton className="w-[146px] h-[36px]" />
          ) : (
            <FilterSort products={products} onFilterSort={setFilteredSortedProducts} />
          )}

          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add new product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Products</DialogTitle>
                <DialogDescription>Fill in the details for adding a new product.</DialogDescription>
              </DialogHeader>
              <ProductsForm
                primaryCategories={mergedPrimaryCategories}
                secondaryCategories={mergedSecondaryCategories}
                subCategories={subCategories}
                stoneNames={stoneNames}
                setOpen={() => setAddOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Fetched Products from DB */}
      <div className="space-y-4">
        {
          // Loading...
          isLoading ? (
            // Loading...
            <div className=" min-h-96 flex w-full flex-col items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : // No products found
          filteredSortedProducts?.length === 0 ? (
            // No products found
            <div className=" min-h-96 flex w-full flex-col items-center justify-center">
              <>
                <p>No products found</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus />
                      Add new product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Products</DialogTitle>
                      <DialogDescription>Fill in the details for adding a new product.</DialogDescription>
                    </DialogHeader>
                    <ProductsForm
                      setOpen={() => setAddOpen(false)}
                      primaryCategories={mergedPrimaryCategories}
                      secondaryCategories={mergedSecondaryCategories}
                      subCategories={subCategories}
                      stoneNames={stoneNames}
                    />
                  </DialogContent>
                </Dialog>
              </>
            </div>
          ) : (
            // Mapping the fetched products
            filteredSortedProducts?.map((product: INewProduct, index: number) => (
              <Card key={product.id || index} className="group">
                {/* Card Header contains Edit, Delete button & Title with tags ||++++|| Also the Product Code on right side and Featured mark for featured products only  */}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    {/* -----Left Part----- */}
                    <div className="flex flex-col gap-2">
                      {/* Product Name */}
                      <CardTitle className="flex items-center gap-1 text-2xl">{product.name}</CardTitle>

                      {/* Tags */}
                      <CardDescription>
                        {product.tags.map((tag, index) => (
                          <span key={index}>
                            {tag}
                            {index !== product.tags.length - 1 && ", "}
                          </span>
                        ))}
                      </CardDescription>

                      {/* Edit & Delete Buttons */}
                      <div className="flex gap-2">
                        {/* Function to render the Edit Product Dialog Component defined below */}
                        {openEditProductModal(product)}

                        {/* Function to render the Delete Product AlertDialog Component defined below */}
                        {confirmProductDeletion(product)}
                      </div>
                    </div>

                    {/* -----Right Part----- */}
                    <div className="flex justify-between flex-col gap-1">
                      {/* Product Code */}
                      <Badge>{product.productCode}</Badge>

                      {/* Featured Badge */}
                      {product.isFeatured && <Badge className="bg-blue-700 hover:bg-blue-700/80">Featured</Badge>}

                      <div></div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                  {/* Description */}
                  <p>{product.description}</p>

                  <div className="grid grid-cols-2 gap-4 capitalize">
                    {/* Stone Name */}
                    <p>
                      <strong>Stone name:</strong> {product.stoneName}
                    </p>

                    {/* Created Date */}
                    <p>
                      <strong>Created at:</strong>{" "}
                      {product.createdAt ? format(new Date(product.createdAt), "PPp") : "N/A"}
                    </p>

                    {/* Primary Category */}
                    <p>
                      <strong>Primary Categories:</strong>{" "}
                      {product.primaryCategory.length === 0 ? "N/A" : product.primaryCategory.join(", ")}
                    </p>

                    {/* Secondary Category */}
                    <p>
                      <strong>Secondary Categories:</strong> {product.secondaryCategory.join(", ")}
                    </p>

                    {/* Sub Category */}
                    <p>
                      <strong>Subcategory:</strong> {product.subCategory || "N/A"}
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
          )
        }
      </div>
    </main>
  );

  function confirmProductDeletion(product: INewProduct) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 /> Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently delete {`${product.name} (${product.productCode})`}?</AlertDialogTitle>
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
    );
  }

  function openEditProductModal(product: INewProduct) {
    return (
      <Dialog
        open={editOpen.isOpen && editOpen.productCode === product.productCode}
        onOpenChange={(isOpen) => setEditOpen({ isOpen: isOpen, productCode: product.productCode })}
      >
        <DialogTrigger asChild>
          <Button variant="secondary" onClick={() => setEditOpen({ isOpen: true, productCode: product.productCode })}>
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
            primaryCategories={mergedPrimaryCategories}
            secondaryCategories={mergedSecondaryCategories}
            edit={product}
            stoneNames={stoneNames}
            subCategories={subCategories}
            setOpen={setEditOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }
}
