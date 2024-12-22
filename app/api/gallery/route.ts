import { connectDB } from "@/lib/db";
import { Gallery } from "@/lib/schema";
import _ from "lodash";
import { NextResponse } from "next/server";

// -------------------------------------
// GET is used to get all gallery posts
// -------------------------------------
export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const gallery = await Gallery.find(); // Query with the validated ID

    // Return an error if no gallery post is not found (ERROR: 404)
    if (!gallery || gallery.length === 0) {
      return NextResponse.json({
        status: 404,
        message: "No gallery posts found",
      });
    }

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ status: 500, message: (error as Error).message });
  }
}

// -------------------------------------
// POST is used to create a new gallery post
// -------------------------------------
export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const body = await req.json(); // Get the request body
    const { image, productCode } = body; // Get the title and content from the request body

    // Check if the title & content is not provided (Return an error if the title is not provided)
    if (!image && !productCode) {
      return NextResponse.json({ status: 400, message: "Missing required fields" });
    }

    // Create a new gallery post
    const gallery = await Gallery.create({ productLink: `/products/${_.kebabCase(productCode)}`, image });

    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ status: 500, message: (error as Error).message });
  }
}
