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
