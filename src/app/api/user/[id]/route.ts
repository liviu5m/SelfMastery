import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    if (data.type == "data") {
      if (
        data.username != data.currentUsername &&
        (await prisma.user.findUnique({ where: { username: data.username } }))
      )
        return NextResponse.json("Username already exist");
      if (
        data.email != data.currentEmail &&
        (await prisma.user.findUnique({ where: { email: data.email } }))
      )
        return NextResponse.json("Email already exist");

      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          username: data.username,
          email: data.email,
        },
      });
      return NextResponse.json(user);
    } else if (data.type == "password") {
      if (!(await bcrypt.compare(data.current_password, data.password))) {
        return NextResponse.json("Current Password is incorrect");
      }
      if (data.new_password != data.confirm_password)
        return NextResponse.json("Password Confirmation does not match");

      const user = await prisma.user.update({
        where: {
          id: parseInt(id),
        },
        data: {
          password: await bcrypt.hash(data.new_password, 12),
        },
      });
      return NextResponse.json(user);
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
