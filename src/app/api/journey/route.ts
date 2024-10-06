import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const journey = await prisma.journey.create({
      data: {},
    });
    
    return NextResponse.json(journey);
  } catch (err) {
    return NextResponse.json(err);
  }
}

