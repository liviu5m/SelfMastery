import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const journey = await prisma.journey.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(journey);
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    let journey;
    if (data.type && data.type == "week_split") {
      journey = await prisma.journey.update({
        where: {
          id: parseInt(id),
        },
        data: {
          week_split_id: data.week_split,
        },
      });
    } else {
      journey = await prisma.journey.update({
        where: {
          id: parseInt(id),
        },
        data: {
          gym_split_id: data.split,
        },
      });
    }
    return NextResponse.json(journey);
  } catch (err) {
    return NextResponse.json(err);
  }
}
