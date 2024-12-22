import { connectDB } from "@/lib/db";
import { Enquiry } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB(); // Connect to the database

    const enquiries = await Enquiry.find(); // Query with the validated ID

    // Return an error if the contacts is not found (ERROR: 404)
    if (!enquiries || enquiries.length === 0) {
      return NextResponse.json(
        {
          message: "No enquiries found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to the database

    const body = await req.json(); // Get the request body

    const { name, email, phone, message } = body; // Get the details from the request body

    // Check if the name, email, phone & message are not provided (Return an error if the title is not provided)
    if (!name && !email && !phone && !message) {
      return NextResponse.json(
        { message: "Please provide all the details" },
        {
          status: 400,
        }
      );
    }

    const newEnquiry = Enquiry.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
