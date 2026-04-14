import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession, NextAuthOptions } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface CustomSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
}

export async function PUT(req: NextRequest) {
  const session = (await getServerSession(
    authOptions as NextAuthOptions,
  )) as CustomSession | null;

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email }: { name: string; email: string } = await req.json();

  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and email are required" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const updated = await User.findByIdAndUpdate(
      session.user.id,
      { name, email },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated", user: updated });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
