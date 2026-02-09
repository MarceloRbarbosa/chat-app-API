import prisma from "../config/database"

async function createMessage(userId: number, to: string, text: string, type: string) {
  return prisma.message.create({
    data: { userId, to, text, type },
    include: { user: { select: { username: true } } },
  });
}

async function listMessages(limit = 80) {
    return prisma.message.findMany({
        orderBy: { createdAt: "desc"},
        take: limit,
        include:{ user: {select: { id:true, username:true}}},
    });
}

const messagesRepository = { createMessage, listMessages}

export default messagesRepository;