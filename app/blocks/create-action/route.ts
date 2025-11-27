import { prisma } from "@/prisma.client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, code } = await req.json();
  const userId = Number((await cookies()).get("user_id")?.value);

  await prisma.block.create({ data: { title, code, userId } });

  return NextResponse.json({ ok: true });
}
