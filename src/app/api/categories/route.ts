import { NextResponse } from "next/server";
import  dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

// GET ALL CATEGORIES
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// CREATE CATEGORY
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const category = await Category.create(body);

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}