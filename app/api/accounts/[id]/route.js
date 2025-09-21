import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { type, description, amount } = await request.json();

  const entry = () => {
    if (type === "cost") {
      return { costs: { create: { name: description, amount } } };
    } else if (type === "save") {
      return { saves: { create: { name: description, amount } } };
    } else if (type === "extra") {
      return { extras: { create: { name: description, amount } } };
    } else {
      return {};
    }
  };
  // update in db
  const updatedAccount = await prisma.account.update({
    where: { id },
    data: entry(),
  });
  if (!updatedAccount) {
    return NextResponse.json(
      { error: "Account not found with the given ID" },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedAccount);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const account = await prisma.account.findUnique({
    where: { id },
  });
  if (!account) {
    return NextResponse.json(
      { error: "Account not found with the given ID" },
      { status: 404 }
    );
  }
  // delete from db
  const deletedAccount = await prisma.account.delete({
    where: { id },
  });
  console.log(deletedAccount);
  return NextResponse.json(
    { message: "Account deleted successfully" },
    { status: 200 }
  );
}
