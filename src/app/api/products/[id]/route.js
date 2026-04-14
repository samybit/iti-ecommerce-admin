import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // ضروري جداً في النسخ الجديدة
    const body = await req.json();
    const updated = await Product.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // ضروري جداً
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}