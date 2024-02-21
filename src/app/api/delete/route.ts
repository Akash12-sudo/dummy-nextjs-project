import BlogModel from "@/app/(models)/schema";
import { NextResponse } from "next/server";

export async function POST(req: {
  json: () => PromiseLike<{ slug: any }> | { slug: any };
}) {
  try {
    const { slug } = await req.json();
    const deleteBlog = await BlogModel.findByIdAndDelete(slug);
    if (!deleteBlog) {
      return NextResponse.json(
        { message: "Document not found" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "not deleted" }, { status: 500 });
  }
}
