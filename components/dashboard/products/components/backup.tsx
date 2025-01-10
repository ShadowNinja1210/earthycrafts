// "use client";

// // ----Dependencies---- //
// import { useEffect, useState } from "react";

// // ----React Query & Schema---- //
// import { useMutation } from "@tanstack/react-query";
// import { IProduct } from "@/lib/schema";
// import { addProduct, editProduct } from "@/lib/api";

// // ----Form---- //
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Form, FormLabel, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

// // ----UI Components---- //
// // import { Label } from "@/components/ui/Label";
// import { Input } from "@/components/ui/input";
// import { DropCombo } from "@/components/drop-combo";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { FilesUpload } from "@/components/files-upload";

// // Form Schema
// const productFormSchema = z.object({
//   name: z.string().min(3).max(255),
//   images: z.array(
//     z.object({
//       image: z.string(),
//       main: z.boolean(),
//     })
//   ),
//   productCode: z.string(),
//   description: z.string(),
//   stoneName: z.string(),
//   category: z.string(),
//   subCategory: z.string(),
//   isFeatured: z.boolean(),
//   tags: z.array(z.string()),
// });

// // Product Form Props
// type ProductFormProps = {
//   categories: string[];
//   subCategories: string[];
//   stoneNames: string[];
//   setOpen: (value: boolean) => void;
//   edit?: IProduct;
// };

// // Product Form Component
// export default function ProductsForm({ categories, subCategories, stoneNames, edit, setOpen }: ProductFormProps) {
//   const [productCodeError, setProductCodeError] = useState<string | null>(null);
//   const [imageUrls, setImageUrls] = useState<string[]>([]);
//   const [mainImg, setMainImg] = useState<string | null>(null);

//   // Query Mutations for adding and editing products
//   const addSubmission = useMutation({
//     mutationFn: (formData) => addProduct(formData),
//   });
//   const editSubmission = useMutation({
//     mutationFn: ({ formData, id }: { formData: z.infer<typeof productFormSchema>; id: string }) =>
//       editProduct(formData, id),
//   });

//   // Form Hook
//   const form = useForm<z.infer<typeof productFormSchema>>({
//     resolver: zodResolver(productFormSchema),
//     defaultValues: {
//       name: edit ? edit.name : "",
//       images: edit ? edit.images : [],
//       productCode: edit ? edit.productCode : "",
//       description: edit ? edit.description : "",
//       stoneName: edit ? edit.stoneName : "",
//       category: edit ? edit.category : "",
//       subCategory: edit ? edit.subCategory : "",
//       isFeatured: edit ? edit.isFeatured : false,
//       tags: edit ? edit.tags : [],
//     },
//   });

//   // Use Effect for setting the form values when editing
//   useEffect(() => {
//     if (edit) {
//       setImageUrls(edit.images.map((image) => image.image));
//     }
//   }, [edit]);

//   // Form Submit Handler
//   const onSubmit = (values: z.infer<typeof productFormSchema>) => {
//     console.log(values);

//     if (edit) {
//       editSubmission.mutate({ formData: values, id: edit._id.toString() });
//     } else {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-expect-error
//       addSubmission.mutate(values);
//     }
//     setProductCodeError(null);
//     setOpen(false);
//   };

//   const handleImageUrls = (urls?: string[], removeUrl?: string) => {
//     // Deleting an image from the list
//     if (removeUrl) {
//       console.log("Remove URL:", removeUrl);
//       // Handle deletion from the list
//       const updatedImages = imageUrls.filter((url) => url !== removeUrl);

//       console.log("Current Images:", imageUrls);
//       console.log("Updated Images:", updatedImages);

//       // Update the form and state
//       setImageUrls(updatedImages);

//       form.setValue(
//         "images",
//         updatedImages.map((url) => ({
//           image: url,
//           main: mainImg === url,
//         }))
//       );

//       // Update main image if deleted
//       if (mainImg === removeUrl) {
//         const newMainImg = updatedImages.length > 0 ? updatedImages[0] : null;
//         setMainImg(newMainImg);
//         if (newMainImg) {
//           form.setValue(
//             "images",
//             updatedImages.map((url) => ({
//               image: url,
//               main: url === newMainImg,
//             }))
//           );
//         }
//         return;
//       }
//     }

//     if (urls && urls.length > 0) {
//       const newImages = [...imageUrls, ...urls];
//       setImageUrls(newImages);

//       form.setValue(
//         "images",
//         newImages.map((url, index) => {
//           if (imageUrls.length === 0) {
//             setMainImg(url);
//             return { image: url, main: true };
//           } else if (mainImg === url) {
//             return { image: url, main: true };
//           } else if (mainImg === null && index === 0) {
//             setMainImg(url);
//             return { image: url, main: true };
//           } else {
//             return { image: url, main: false };
//           }
//         })
//       );
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-scroll px-2">
//         <FilesUpload onChange={handleImageUrls} value={imageUrls} setMainImg={setMainImg} main={mainImg} />

//         {/* Product name & code */}
//         <div className="grid grid-cols-2 gap-8">
//           {/* Product Name */}
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Name</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     onClick={() => {
//                       console.log("Product Name Input Clicked");
//                     }}
//                     onChange={(e) => {
//                       console.log(e.target.value);
//                       field.onChange(e.target.value);
//                     }}
//                     value={field.value}
//                   />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* Product Code */}
//           <FormField
//             control={form.control}
//             name="productCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Code</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage>{productCodeError}</FormMessage>
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Categories */}
//         <div className="grid grid-cols-2 gap-8">
//           {/* Product Category */}
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Category</FormLabel>

//                 <FormControl>
//                   <DropCombo items={categories} onSelect={field.onChange} defaultValue={field.value} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           {/* Product Sub Category */}
//           <FormField
//             control={form.control}
//             name="subCategory"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Sub Category</FormLabel>
//                 <FormControl>
//                   <DropCombo items={subCategories} onSelect={field.onChange} defaultValue={field.value} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Product Description */}
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Product Description</FormLabel>
//               <Textarea {...field} />
//             </FormItem>
//           )}
//         />

//         {/* Product Tags */}
//         <FormField
//           control={form.control}
//           name="tags"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tags</FormLabel>
//               <div className="space-y-2">
//                 {/* Input for adding tags */}
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     placeholder="Enter a tag"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && e.currentTarget.value.trim()) {
//                         e.preventDefault();
//                         const newTag = e.currentTarget.value.trim();
//                         if (!field.value.includes(newTag)) {
//                           field.onChange([...field.value, newTag]);
//                         }
//                         e.currentTarget.value = "";
//                       }
//                     }}
//                   />
//                   <Button
//                     type="button"
//                     onClick={() => {
//                       const inputElement = document.querySelector<HTMLInputElement>("input[placeholder='Enter a tag']");
//                       const newTag = inputElement?.value.trim();
//                       if (newTag && !field.value.includes(newTag)) {
//                         field.onChange([...field.value, newTag]);
//                         if (inputElement) inputElement.value = "";
//                       }
//                     }}
//                     className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-3 py-1 rounded"
//                   >
//                     Add Tag
//                   </Button>
//                 </div>

//                 {/* Display tags */}
//                 <FormDescription className="flex flex-wrap gap-2">
//                   {field.value.map((tag, index) => (
//                     <span key={index} className="flex items-center space-x-1 bg-gray-200 px-3 py-1 rounded">
//                       <span>{tag}</span>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const updatedTags = field.value.filter((_, i) => i !== index);
//                           field.onChange(updatedTags);
//                         }}
//                         className="text-red-500"
//                       >
//                         x
//                       </button>
//                     </span>
//                   ))}
//                 </FormDescription>
//               </div>
//             </FormItem>
//           )}
//         />

//         {/* Featured option */}
//         <FormField
//           control={form.control}
//           name="isFeatured"
//           render={({ field }) => (
//             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
//               <FormControl>
//                 <Checkbox
//                   checked={field.value as boolean}
//                   onCheckedChange={(value: boolean) => field.onChange(value)}
//                   id="isFeatured"
//                 />
//               </FormControl>
//               <div className="space-y-1 leading-none">
//                 <FormLabel htmlFor="isFeatured">Want the product to be featured?</FormLabel>
//                 <FormDescription>Featured products will be shown on the homepage.</FormDescription>
//               </div>
//             </FormItem>
//           )}
//         />

//         {/* Submit */}
//         <div className="grid grid-cols-2 gap-8 items-end">
//           {/* Stone Name */}
//           <FormField
//             control={form.control}
//             name="stoneName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Stone Name</FormLabel>
//                 <DropCombo items={stoneNames} onSelect={field.onChange} defaultValue={field.value} />
//               </FormItem>
//             )}
//           />
//           {/* Submit Button */}
//           <Button>Submit</Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
