"use client";

// ----Dependencies---- //
import { useEffect, useState } from "react";

// ----React Query & Schema---- //
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewProduct } from "@/lib/schema";
import { addProduct, editProduct } from "@/lib/api";

// ----Form---- //
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormLabel, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

// ----UI Components---- //
// import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
// import { DropCombo } from "@/components/drop-combo";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FilesUpload } from "@/components/files-upload";
import { SearchableMultiDropdown } from "@/components/searchable-multi-dropdown";
import SelectField from "@/components/select-field";

// Form Schema
const productFormSchema = z.object({
  name: z.string().min(3).max(255),
  images: z.array(
    z.object({
      image: z.string(),
      main: z.boolean(),
    })
  ),
  productCode: z.string(),
  description: z.string(),
  stoneName: z.string(),
  primaryCategory: z.array(z.string()),
  secondaryCategory: z.array(z.string()),
  subCategory: z.string(),
  isFeatured: z.boolean(),
  tags: z.array(z.string()),
});

// Product Form Props
type ProductFormProps = {
  primaryCategories: string[];
  secondaryCategories: string[];
  subCategories: string[];
  stoneNames: string[];
  setOpen: (params: { isOpen: boolean; productCode: string }) => void;
  edit?: INewProduct;
};

// Product Form Component
export default function ProductsForm({
  primaryCategories,
  secondaryCategories,
  subCategories,
  stoneNames,
  edit,
  setOpen,
}: ProductFormProps) {
  const [productCodeError, setProductCodeError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [mainImg, setMainImg] = useState<string | null>(null);

  // Query Mutations for adding and editing products
  const queryClient = useQueryClient();

  const addSubmission = useMutation({
    mutationFn: (formData) => addProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardProducts"] }); // Refresh products list
    },
  });

  const editSubmission = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardProducts"] }); // Refresh products list
    },
    mutationFn: ({ formData, id }: { formData: z.infer<typeof productFormSchema>; id: string }) =>
      editProduct(formData, id),
  });

  // Form Hook
  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: edit ? edit.name : "",
      images: edit ? edit.images : [],
      productCode: edit ? edit.productCode : "",
      description: edit ? edit.description : "",
      stoneName: Array.isArray(edit?.stoneName) ? edit.stoneName.join(", ") : edit?.stoneName || "",
      primaryCategory: edit ? edit.primaryCategory : [],
      secondaryCategory: edit ? edit.secondaryCategory : [],
      subCategory: edit ? edit.subCategory : "",
      isFeatured: edit ? edit.isFeatured : false,
      tags: edit ? edit.tags : [],
    },
  });

  // Use Effect for setting the form values when editing
  useEffect(() => {
    if (edit) {
      setImageUrls(edit.images.map((image) => image.image));
    }
  }, [edit]);

  // Form Submit Handler
  const onSubmit = (values: z.infer<typeof productFormSchema>) => {
    console.log(values);

    if (edit) {
      editSubmission.mutate({ formData: values, id: edit._id.toString() });
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      addSubmission.mutate(values);
    }
    setProductCodeError(null);
    setOpen({ isOpen: false, productCode: "" });
  };

  const handleImageUrls = (urls?: string[], removeUrl?: string) => {
    // Deleting an image from the list
    if (removeUrl) {
      console.log("Remove URL:", removeUrl);
      // Handle deletion from the list
      const updatedImages = imageUrls.filter((url) => url !== removeUrl);

      console.log("Current Images:", imageUrls);
      console.log("Updated Images:", updatedImages);

      // Update the form and state
      setImageUrls(updatedImages);

      form.setValue(
        "images",
        updatedImages.map((url) => ({
          image: url,
          main: mainImg === url,
        }))
      );

      // Update main image if deleted
      if (mainImg === removeUrl) {
        const newMainImg = updatedImages.length > 0 ? updatedImages[0] : null;
        setMainImg(newMainImg);
        if (newMainImg) {
          form.setValue(
            "images",
            updatedImages.map((url) => ({
              image: url,
              main: url === newMainImg,
            }))
          );
        }
        return;
      }
    }

    if (urls && urls.length > 0) {
      const newImages = [...imageUrls, ...urls];
      setImageUrls(newImages);

      form.setValue(
        "images",
        newImages.map((url, index) => {
          if (imageUrls.length === 0) {
            setMainImg(url);
            return { image: url, main: true };
          } else if (mainImg === url) {
            return { image: url, main: true };
          } else if (mainImg === null && index === 0) {
            setMainImg(url);
            return { image: url, main: true };
          } else {
            return { image: url, main: false };
          }
        })
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="space-y-6 overflow-y-scroll max-h-[80vh] py-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Code */}
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Code</FormLabel>
                <FormControl>
                  <Input placeholder="Product Code" {...field} />
                </FormControl>
                {productCodeError && <p className="text-red-600 text-sm">{productCodeError}</p>}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select */}
          {/* Stone Name */}
          <FormField
            control={form.control}
            name="stoneName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stone Name</FormLabel>
                <FormControl>
                  <SelectField items={stoneNames} placeholder="Select Stone Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Searchable */}
          {/* Primary Categories */}
          <FormField
            control={form.control}
            name="primaryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Categories</FormLabel>
                <FormControl>
                  <SearchableMultiDropdown
                    placeholder="Primary Categories"
                    items={primaryCategories}
                    selectedItems={field.value ?? []}
                    onSelect={(values) => field.onChange(values)}
                    onAdd={(value) => {
                      const newValue = value.trim();
                      const selectedItems = field.value;
                      if (newValue) {
                        field.onChange([...selectedItems, newValue]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Searchable */}
          {/* Secondary Categories */}
          <FormField
            control={form.control}
            name="secondaryCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Categories</FormLabel>
                <FormControl>
                  <SearchableMultiDropdown
                    placeholder="Secondary Categories"
                    items={secondaryCategories}
                    selectedItems={field.value}
                    onSelect={(values: string[]) => field.onChange(values)}
                    onAdd={(value) => {
                      const newValue = value.trim();
                      const selectedItems = field.value;
                      if (newValue) {
                        field.onChange([...selectedItems, newValue]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select */}
          {/* Subcategories */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <SelectField items={subCategories} placeholder="Select Subcategory" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Searchable */}
          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <SearchableMultiDropdown
                    items={[]}
                    selectedItems={field.value}
                    onSelect={(values: string[]) => field.onChange(values)}
                    onAdd={(value) => {
                      const newValue = value.trim();
                      const selectedItems = field.value;
                      if (newValue) {
                        field.onChange([...selectedItems, newValue]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Featured Checkbox */}
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex items-center space-x-2 rounded-lg border">
                  <Checkbox
                    id="isFeatured"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    className="ml-4"
                  />
                  <FormLabel htmlFor="isFeatured" className="py-4 pr-4">
                    Is this product featured?
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images */}
          <FormItem>
            <FormLabel>Product Images</FormLabel>
            <FilesUpload onChange={handleImageUrls} value={imageUrls} main={mainImg} setMainImg={setMainImg} />
          </FormItem>

          {/* Tags */}
        </div>
        {/* Submit Button */}
        <Button disabled={editSubmission.isPending} type="submit" className="w-full">
          {edit ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Form>
  );
}
