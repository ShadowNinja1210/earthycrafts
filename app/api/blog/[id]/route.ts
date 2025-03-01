import { Blog } from "@/lib/schema";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";

// -------------------------------------
// GET is used to get a blog post by ID
// -------------------------------------
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params; // Get the blog post ID

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        {
          status: 400,
        }
      ); // Return an error if the ID format is invalid (ERROR: 400)
    }

    const blog = await Blog.findById(id); // Query with the validated ID

    // Return an error if the blog post is not found (ERROR: 404)
    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// -------------------------------------
// PATCH is used to update a blog post by ID
// -------------------------------------
// PATCH: Update a blog post by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params; // Get the blog post ID
    const body = await req.json(); // Get the request body

    const { title, content } = body; // Extract fields from body

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // Check if required fields are provided
    if (!title && !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Update the blog post and return the new version
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("PATCH error:", error); // Log error
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// -------------------------------------
// DELETE is used to delete a blog post by ID
// -------------------------------------
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Ensure the database is connected

    const { id } = params;

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error); // Log any errors
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
