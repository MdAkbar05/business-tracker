import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust path

// DELETE /api/accounts/:accountId/costs/:costId
export async function DELETE(req, { params }) {
  const { accountId, costId } = await params;

  try {
    const deleted = await prisma.cost.delete({
      where: {
        id: costId,
        accountId: accountId,
      },
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Cost item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
