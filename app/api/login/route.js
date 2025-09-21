import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json(
      { error: "Not found your accounts with the email" },
      { status: 401 }
    );
  } else {
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    } else {
      // omit password field
      delete user.password;
      return NextResponse.json(user);
    }
  }
}
