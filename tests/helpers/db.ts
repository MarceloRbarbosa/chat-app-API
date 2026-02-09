import prisma from "../../src/config/database";

export async function cleanDb() {
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();
}
