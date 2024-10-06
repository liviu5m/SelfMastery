import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET() {
  const splits = await prisma.gymSplit.findMany({});
  return NextResponse.json(splits);
}