import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await dbConnect();

  const [totalProducts, outOfStock, totalCategories] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ stock: 0 }),
    // Category.countDocuments(),
    Product.distinct("category").then((r) => r.length),
  ]);

  return NextResponse.json({
    success: true,
    data: { totalProducts, outOfStock, totalCategories },
  });
}
