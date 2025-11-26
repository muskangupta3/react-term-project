"use server";

import { prisma } from "@/database";
import { cookies } from "next/headers";

export async function handleLogin(formData: FormData) {
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString().trim();

  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  const foundUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!foundUser || foundUser.password !== password) {
    return { error: "Invalid username or password." };
  }

  (await
    cookies()).set("user_id", String(foundUser.id), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

  return { success: true };
}
