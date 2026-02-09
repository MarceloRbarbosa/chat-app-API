import prisma from "../src/config/database";

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
