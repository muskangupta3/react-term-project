import { NextResponse } from "next/server";
import { prisma } from "@/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, code } = body;

    if (!title || !code) {
      return NextResponse.json({ error: "Missing title or code" }, { status: 400 });
    }

    const block = await prisma.block.create({ data: { title, code } });

    return NextResponse.json(block, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blocks = await prisma.block.findMany();
    return NextResponse.json(blocks);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
