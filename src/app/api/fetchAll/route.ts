import { NextResponse } from "next/server";
import BlogModel from "@/app/(models)/schema";

export async function GET(req: any) {
  try {
    const blogslist = await BlogModel.find();
    return NextResponse.json(
      { message: "success", data: blogslist },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
