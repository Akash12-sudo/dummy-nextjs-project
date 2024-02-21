import BlogModel from "../(models)/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    // Creating a new document in database
    const newEntry = new BlogModel(body);
    // Saving the document
    await newEntry.save();

    return NextResponse.json(
      { message: "Success", content: body },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
