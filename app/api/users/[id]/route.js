import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request, { params }) {
  const { id } = await params;
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return NextResponse.json(
      { error: "User not found with the given ID" },
      { status: 404 }
    );
  }
  if (!email || !name || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      email,
      name,
      password,
    },
  });

  return NextResponse.json(updatedUser);
}
