import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    console.log("progress");

    try {
      const progress = await prisma.progress.update({
        where: { id: parseInt(id) },
        data: {
          [data.type]: data.value,
        },
      });
      console.log(progress);
      
      return NextResponse.json(progress);
    }catch(err) {
      return NextResponse.json(err);
    }
  } catch (err) {
    console.log(err);
    
    return NextResponse.json(err);
  }
}
