import { INewProduct, NewProduct } from "@/lib/schema";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// -------------------------------------
// POST is used to create a new product
// -------------------------------------
export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const body = await req.json(); // Get the request body

    // Create a new product
    const newProducts = await Promise.all(
      body.map((product: INewProduct) => {
        const {
          name,
          images,
          description,
          productCode,
          stoneName,
          primaryCategory,
          secondaryCategory,
          subCategory,
          isFeatured,
          inStock,
          tags,
        } = product;
        NewProduct.create({
          name,
          images,
          description,
          productCode,
          stoneName,
          primaryCategory: [primaryCategory?.map((category) => category?.toLowerCase())],
          secondaryCategory: [secondaryCategory?.map((category) => category?.toLowerCase())],
          subCategory: subCategory?.toLowerCase(),
          isFeatured,
          inStock,
          tags,
        });
      })
    );

    return NextResponse.json(newProducts, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// // -------------------------------------
// // PATCH: Update a product by ID
// // -------------------------------------
// export async function PATCH() {
//   try {
//     await connectDB(); // Connect to the database

//     // Update the product
//     const products = await NewProduct.find();

//     if (!products || products.length === 0) {
//       return NextResponse.json(
//         { message: "Product not found" },
//         {
//           status: 404,
//         }
//       );
//     }

//     const updatedProducts = await Promise.all(
//       products.map((product) => {
//         const updatedProduct = NewProduct.findByIdAndUpdate(
//           product._id,
//           {
//             primaryCategory: product.primaryCategory.map((category) => category.toLowerCase),
//             secondaryCategory: product.secondaryCategory.map((category) => category.toLowerCase),
//             subCategory: product.subCategory?.toLowerCase(),
//           },
//           {
//             new: true, // Return the updated product
//             runValidators: true, // Ensure Mongoose validators run
//           }
//         );
//         return updatedProduct;
//       })
//     );

//     return NextResponse.json({ updatedProducts }, { status: 200 });
//   } catch (error) {
//     console.error("PATCH error:", error); // Log the error for debugging
//     return NextResponse.json(
//       { message: (error as Error).message },
//       {
//         status: 500,
//       }
//     );
//   }
// }
