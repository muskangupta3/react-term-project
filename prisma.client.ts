import { PrismaClient } from "@prisma/client";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in .env");
}

export const prisma = new PrismaClient({
  adapter: process.env.DATABASE_URL, // for SQLite, this can be the string URL
});
