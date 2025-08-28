// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances during hot reloads in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    //log: ["query"], // optional, can remove if you want
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
