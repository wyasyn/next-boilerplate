import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const categories = ["clothing", "accessories", "footwear", "jewelry"];

  categories.map(async (category) => {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: {
        name: category,
      },
    });
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
