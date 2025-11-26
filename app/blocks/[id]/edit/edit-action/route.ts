import { prisma } from "@/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(req: Request, { params }: Params) {
  const userId = Number((await cookies()).get("user_id")?.value);
  const { title, code } = await req.json();

  await prisma.block.update({
    where: { id: Number(params.id) },
    data: { title, code, userId }, // include userId if needed
  });

  return NextResponse.json({ ok: true });
}
