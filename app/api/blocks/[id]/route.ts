import { NextResponse } from "next/server";
import { prisma } from "@/database";

async function resolveId(params: unknown) {
  const resolved = (await params) as { id?: string } | undefined;
  const id = Number(resolved?.id);
  return Number.isFinite(id) ? id : null;
}

export async function GET(request: Request, { params }: { params: unknown }) {
  const id = await resolveId(params);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    const block = await prisma.block.findUnique({ where: { id } });
    if (!block) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(block);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: unknown }) {
  const id = await resolveId(params);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const body = await request.json();
  const { title, code } = body ?? {};
  if (!title || !code) return NextResponse.json({ error: "Missing title or code" }, { status: 400 });

  try {
    const updated = await prisma.block.update({ where: { id }, data: { title, code } });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: unknown }) {
  const id = await resolveId(params);
  if (id === null) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  try {
    await prisma.block.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
