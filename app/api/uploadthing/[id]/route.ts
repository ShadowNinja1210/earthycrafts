import { NextResponse } from "next/server";
import { utapi } from "./core";

export const DELETE = (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    utapi.deleteFiles(id);

    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      { message: (error as Error).message },
      {
        status: 500,
      }
    );
  }
};
