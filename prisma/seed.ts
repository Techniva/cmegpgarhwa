// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const employeePassword = await bcrypt.hash("Employee@123", 10);

  // Upsert admin
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
    },
  });

  // Upsert employee
  await prisma.user.upsert({
    where: { email: "employee@example.com" },
    update: {},
    create: {
      name: "Employee User",
      email: "employee@example.com",
      password: employeePassword,
      role: "employee",
    },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
