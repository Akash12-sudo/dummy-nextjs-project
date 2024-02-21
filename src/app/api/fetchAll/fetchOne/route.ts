import { NextResponse } from "next/server";
import BlogModel from "@/app/(models)/schema";

export async function POST(req) {
  try {
    const id = await req.json();
    const blog = await BlogModel.findById(id);

    return NextResponse.json({ message: "success", blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}
