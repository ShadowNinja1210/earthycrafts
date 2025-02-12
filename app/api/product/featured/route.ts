import { NewProduct } from "@/lib/schema";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// -------------------------------------
// GET is used to get all featured products
// -------------------------------------
export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const products = await NewProduct.find({ isFeatured: true }); // Query for featured products

    // Return an error if the products is not found (ERROR: 404)
    if (!products || products.length === 0) {
      return NextResponse.json(
        {
          message: "No featured products found",
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
