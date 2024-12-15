import { Blog } from "@/lib/schema";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

// -------------------------------------
// GET is used to get all blog posts
// -------------------------------------
export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const blog = await Blog.find(); // Query with the validated ID

    // Return an error if the blog post is not found (ERROR: 404)
    if (!blog || blog.length === 0) {
      return NextResponse.json(
        {
          message: "No blog posts found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// -------------------------------------
// POST is used to create a new blog post
// -------------------------------------
export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const body = await req.json(); // Get the request body
    const { title, content } = body; // Get the title and content from the request body

    // Check if the title & content is not provided (Return an error if the title is not provided)
    if (!title && !content) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create a new blog post
    const blog = await Blog.create({ title, content });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
