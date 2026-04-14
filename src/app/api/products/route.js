import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // استدعاء الدالة التي أرسلتها أنت
import Product from "@/models/Product"; // تأكد أنك أنشأت الموديل كما شرحنا سابقاً

// 1. جلب جميع المنتجات (GET)
export async function GET() {
  try {
    await dbConnect(); // الاتصال بقاعدة البيانات
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 2. إضافة منتج جديد (POST)
export async function POST(req) {
  try {
    await dbConnect(); // الاتصال بقاعدة البيانات
    const body = await req.json(); // قراءة البيانات المرسلة من الصفحة
    
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}