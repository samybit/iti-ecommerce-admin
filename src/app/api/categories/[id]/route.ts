import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

// =======================
// GET CATEGORY BY ID
// =======================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
// UPDATE CATEGORY
// =======================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
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
// DELETE CATEGORY (PREVENT DELETE LOGIC)
// =======================
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    // 🔴 Prevent delete logic
    const products = await Product.find({ category: id });

    if (products.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete category because it has products",
        },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}