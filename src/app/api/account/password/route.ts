import { NextResponse } from "next/server";
import { getServerSession, NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword)
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );

  if (newPassword.length < 8)
    return NextResponse.json(
      { message: "Password must be at least 8 characters" },
      { status: 400 },
    );

  await dbConnect();

  const user = await User.findById((session.user as { id: string }).id);
  if (!user)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch)
    return NextResponse.json(
      { message: "Current password is incorrect" },
      { status: 400 },
    );

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
