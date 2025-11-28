"use server";

import { prisma } from "@/prisma.client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ---------------- LOGIN ----------------
export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Missing credentials" };
  }

  const foundUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!foundUser || foundUser.password !== password) {
    return { error: "Invalid username or password" };
  }

  (await cookies()).set("user_id", String(foundUser.id), {
    httpOnly: true,
    path: "/",
  });

  return { success: true };
}

// ---------------- CREATE ----------------
export async function createBlock(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) redirect("/login");

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  await prisma.block.create({
    data: {
      title,
      code,
      user: { connect: { id: Number(userId) } },
    },
  });

  redirect("/");
}

// ---------------- UPDATE ----------------
export async function updateBlock(id: string, formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) redirect("/login");

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  await prisma.block.update({
    where: { id: Number(id) },
    data: { title, code },
  });

  redirect(`/blocks/${id}`);
}
