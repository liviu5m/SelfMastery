import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const journal = await prisma.journal.update({
      where: { id: parseInt(id) },
      data: {
        spiritual: data.spiritual,
        mental: data.mental,
        physical: data.physical,
        reflection: data.reflection,
      },
    });
    return NextResponse.json(journal);
  } catch (err) {
    return NextResponse.json(err);
  }
}
