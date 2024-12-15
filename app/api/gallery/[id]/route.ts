import { connectDB } from "@/lib/db";
import { Gallery } from "@/lib/schema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

// -------------------------------------
// DELETE is used to delete a gallery post by ID
// -------------------------------------
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params; // Get the blog post ID

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 }); // Return an error if the ID format is invalid (ERROR: 400)
    }

    // Look for the gallery post by ID
    const gallery = await Gallery.findById(id); // Query with the validated ID

    // Return an error if the blog post is not found (ERROR: 404)
    if (!gallery) {
      return NextResponse.json(
        {
          message: "Gallery post not found",
        },
        { status: 404 }
      );
    }

    // Delete the found gallery post by found gallery post ID
    await Gallery.findByIdAndDelete(gallery._id); // Query with the found ID and delete the blog post

    return NextResponse.json({ message: "Gallery post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
