import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const userId = searchParams.get("userId");

    if (!date || !userId) {
      return NextResponse.json(
        { error: "Date and userId required" },
        { status: 400 }
      );
    }

    // find account(s) for user on that date
    const accounts = await prisma.account.findMany({
      where: {
        date: date, // assuming your "date" column is stored as string (YYYY-MM-DD)
        userId: userId,
      },
      include: {
        costs: true,
        saves: true,
        extras: true,
        user: true,
      },
    });

    if (!accounts.length) {
      return NextResponse.json({ error: "No accounts found" }, { status: 404 });
    }

    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
