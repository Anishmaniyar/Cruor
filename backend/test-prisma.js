import prisma from "./src/db.js";

try {
  console.log("Testing Prisma...");

  const users = await prisma.user.findMany();

  console.log("SUCCESS");
  console.log(users);
} catch (err) {
  console.error(err);
} finally {
  await prisma.$disconnect();
}
