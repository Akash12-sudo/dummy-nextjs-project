import { NextResponse } from "next/server";
import BlogModel from "@/app/(models)/schema";

export async function POST(req: {
  json: () => PromiseLike<{ slug: any; blog: any }> | { slug: any; blog: any };
}) {
  try {
    const { slug, blog } = await req.json();
    const response = { slug: slug, blog: blog };

    const requiredBlog = await BlogModel.findById(slug);

    if (!requiredBlog) {
      return NextResponse.json(
        { message: "blog doesn't exist" },
        { status: 500 }
      );
    }
    const updateBlog = await BlogModel.findByIdAndUpdate(slug, blog, {
      new: true,
    });
    return NextResponse.json(
      { message: "success", updateBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "failed to update", error },
      { status: 500 }
    );
  }
}
