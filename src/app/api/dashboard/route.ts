import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();

  const [totalProducts, outOfStock, totalCategories] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ stock: 0 }),
    Category.countDocuments(),
  ]);

  return NextResponse.json({
    success: true,
    data: { totalProducts, outOfStock, totalCategories },
  });
}
