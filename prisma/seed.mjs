import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("adminpassword", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      email: "admin@example.com",
      password: hashedPassword,
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
    },
  });
}

main()
  .then(() => {
    console.log("Seeding complete");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
