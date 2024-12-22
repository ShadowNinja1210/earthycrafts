import { connectDB } from "@/lib/db";
import { Customization } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const customizations = await Customization.find();

    if (!customizations || customizations.length === 0) {
      return NextResponse.json(
        {
          message: "No customizations found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(customizations, { status: 200 });
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
    await connectDB();

    const body = await req.json();

    const { name, email, phone, url, message } = body;

    if (!name && !email && !phone && !url && !message) {
      return NextResponse.json(
        { message: "Please provide all the details" },
        {
          status: 400,
        }
      );
    }

    const newCustomization = Customization.create({
      name,
      email,
      phone,
      url,
      message,
    });

    return NextResponse.json(newCustomization, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
}
