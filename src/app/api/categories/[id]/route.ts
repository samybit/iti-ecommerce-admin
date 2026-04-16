import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

// helper type
type Context = {
  params: Promise<{ id: string }>;
};

// =======================
// GET
// =======================
export async function GET(req: Request, context: Context) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// =======================
// PUT
// =======================
export async function PUT(req: Request, context: Context) {
  try {
    await dbConnect();

    const { id } = await context.params;
    const body = await req.json();

    const updated = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      category: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// =======================
// DELETE
// =======================
export async function DELETE(req: Request, context: Context) {
  try {
    await dbConnect();

    const { id } = await context.params;

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}