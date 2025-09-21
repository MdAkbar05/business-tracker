import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(request) {
  const accounts = await prisma.account.findMany({
    include: {
      user: {
        omit: { password: true },
      },
      costs: true,
      saves: true,
      extras: true,
    },
  });
  return NextResponse.json(accounts);
}

export async function POST(request) {
  const { userId, date } = await request.json();
  if (!userId || !date) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const newAccount = await prisma.account.create({
    data: {
      userId,
      date,
    },
  });

  return NextResponse.json({ newAccount }, { status: 201 });
}
