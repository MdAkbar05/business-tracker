import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const users = await prisma.user.findMany({
    include: {
      accounts: {
        include: {
          costs: true,
          saves: true,
          extras: true,
        },
      },
    },
    omit: { password: true },
  });
  return NextResponse.json(users);
}

export async function POST(request) {
  const { email, name, password } = await request.json();
  if (!email || !name || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  //   const existingUser = await prisma.user.findUnique({
  //     where: { email },
  //   });
  //   if (existingUser) {
  //     return NextResponse.json({ error: "User already exists" }, { status: 400 });
  //   }
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  //   include accounts field

  return NextResponse.json(newUser);
}
