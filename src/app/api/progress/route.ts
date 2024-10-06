import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { preconnect } from "react-dom";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const progress = await prisma.progress.create({
      data: {
        day: data.day,
        user_id: data.user_id,
        [data.type]: data.value,
      },
    });

    return NextResponse.json(progress);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const day = searchParams.get("day");
    
    const progress = await prisma.progress.findMany({
      where: {
        user_id: parseInt(user_id as string),
        day: day as string,
      },
    });
    
    return NextResponse.json(progress);
  } catch (err) {
    return NextResponse.json(err);
  }
}
