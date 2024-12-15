import { Product } from "@/lib/schema";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// -------------------------------------
// GET is used to get all products
// -------------------------------------
export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const products = await Product.find(); // Query with the validated ID

    // Return an error if the products is not found (ERROR: 404)
    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          message: "No products found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}

// -------------------------------------
// POST is used to create a new product
// -------------------------------------
export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const body = await req.json(); // Get the request body

    const { name, images, description, productCode, stoneName, category, subCategory, isFeatured, inStock, tags } =
      body; // Get the details from the request body

    const sameProduct = await Product.findOne({ productCode: productCode }); // Check if the product already exists

    if (sameProduct) {
      return NextResponse.json({ message: "Product with same product code already exists" }, { status: 409 });
    }

    // Check if the title & content is not provided (Return an error if the title is not provided)
    if (
      !name &&
      !images &&
      !description &&
      !productCode &&
      !stoneName &&
      !category &&
      !subCategory &&
      !isFeatured &&
      !inStock &&
      !tags
    ) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create a new product
    const product = await Product.create({
      name,
      images,
      description,
      productCode,
      stoneName,
      category,
      subCategory,
      isFeatured,
      inStock,
      tags,
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
