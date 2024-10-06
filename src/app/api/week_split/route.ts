import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data);
    
    const split = await prisma.weekSplit.create({
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


    return NextResponse.json(split);
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
}
