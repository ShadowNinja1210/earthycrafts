import { Product } from "@/lib/schema";
import { NextResponse, NextRequest } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";

// -------------------------------------
// GET: Retrieve a product by ID
// -------------------------------------
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params; // Get the product ID

    // // Validate the ID format
    // if (!Types.ObjectId.isValid(id)) {
    //   return NextResponse.json(
    //     { message: "Invalid ID format" },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    const product = await Product.findOne({ productCode: id.toUpperCase() }); // Query the product

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}

// -------------------------------------
// PATCH: Update a product by ID
// -------------------------------------
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params; // Get the product ID
    const body = await req.json(); // Get the request body

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true, // Return the updated product
      runValidators: true, // Ensure Mongoose validators run
    });

    console.log(updatedProduct);

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({ updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}

// -------------------------------------
// DELETE: Delete a product by ID
// -------------------------------------
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB(); // Connect to the database

    const { id } = params;

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },

        {
          status: 400,
        }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    // const deletedProduct = await Product.findById(id); // Query the product (for logging & testing)

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("DELETE error:", error); // Log the error for debugging
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
