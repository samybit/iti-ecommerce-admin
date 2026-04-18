import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";


export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find().populate("category");
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const newProduct = await Product.create(body);
    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
