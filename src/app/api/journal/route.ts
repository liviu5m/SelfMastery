import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const journal = await prisma.journal.create({
      data: {
        user_id: data.user_id,
        day: data.day,
        spiritual: data.spiritual,
        physical: data.physical,
        mental: data.mental,
        reflection: data.reflection,
      },
    });
    return NextResponse.json(journal);
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const day = searchParams.get("day");

    const journal = await prisma.journal.findMany({
      where: {
        user_id: parseInt(user_id as string),
        day: day as string,
      },
    });

    return NextResponse.json(journal);
  } catch (err) {
    return NextResponse.json(err);
  }
}
