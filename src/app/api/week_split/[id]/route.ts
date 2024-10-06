import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const weekSplit = await prisma.weekSplit.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(weekSplit);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const weekSplit = await prisma.weekSplit.update({
      where: {
        id: parseInt(id),
      },
      data: {
        monday: data.Monday.day ? data.Monday.day : null,
        tuesday: data.Tuesday.day ? data.Tuesday.day : null,
        wednesday: data.Wednesday.day ? data.Wednesday.day : null,
        thursday: data.Thursday.day ? data.Thursday.day : null,
        friday: data.Friday.day ? data.Friday.day : null,
        saturday: data.Saturday.day ? data.Saturday.day : null,
        sunday: data.Sunday.day ? data.Sunday.day : null,
      },
    });
    return NextResponse.json(weekSplit);
  } catch (err) {
    return NextResponse.json(err);
  }
}
