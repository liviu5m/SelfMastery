import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {

    const result = await prisma.gymSplit.findMany({
      where: {
        id: parseInt(id), 
      },
      select: {
        name: true, 
        GymSplitDays: {
          select: {
            day_name: true,
            split: true, 
            GymSplitDaysMuscle: {
              select: {
                group_muscle: {
                  select: {
                    name: true, 
                  },
                },
              },
            },
          },
          orderBy: {
            day_name: "asc", 
          },
        },
      },
      orderBy: {
        name: "asc", 
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}
