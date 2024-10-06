import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authConfig } from "@/libs/auth";
import { signOut } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.username || !data.email)
      return NextResponse.json({ error: "Please fill all fields" });
    if (data.password != data.password_confirmation)
      return NextResponse.json({ error: "Password does not match" });
    if (data.password.length < 8)
      return NextResponse.json({
        error: "Length of the password must be at least 8",
      });
    const user = await prisma.user.create({
      data: {
        username: data.username,
        journey_id: data.journey_id,
        email: data.email,
        password: await bcrypt.hash(data.password, 12),
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json({ error: "No User" });
  }

  try {
    let user;

    if (session.user.email?.includes("@")) {
      user = await prisma.user.findUnique({
        where: { email: session.user.email || "" },
      });
      if(user == null) return NextResponse.json("Email Error");
    } else {
      user = await prisma.user.findUnique({
        where: { id: parseInt(session.user.email || "") },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}
