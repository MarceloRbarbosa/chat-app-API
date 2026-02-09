import messagesRepository from "../repositories/messagesRepository";

type CreateMessageInput = {
  userId: number;
  to: string;
  text: string;
  type: "message" | "private_message";
};

function formatTime(date: Date) {
  return date.toISOString().slice(11, 19); // HH:mm:ss
}

function normalizeTo(to: string) {
  const trimmed = (to ?? "").trim();

  if (!trimmed) return "Todos";
  if (trimmed.toLowerCase() === "todos") return "Todos";

  return trimmed;
}

async function createMessage({ userId, to, text, type }: CreateMessageInput) {
  if (!text || text.trim().length === 0) {
    throw { type: "bad_request", message: "text is required" };
  }

  const finalTo = normalizeTo(to);

  if (type === "private_message" && finalTo === "Todos") {
    throw {
      type: "bad_request",
      message: "A valid recipient is required for private messages.",
    };
  }

  const msg = await messagesRepository.createMessage(
    userId,
    finalTo,
    text.trim(),
    type
  );

  return {
    from: msg.user.username,
    to: msg.to,
    text: msg.text,
    type: msg.type,
    time: formatTime(msg.createdAt),
  };
}

async function listMessages() {
  const messages = await messagesRepository.listMessages(80);

  return messages.map((msg) => ({
    from: msg.user.username,
    to: msg.to,
    text: msg.text,
    type: msg.type,
    time: formatTime(msg.createdAt),
  }));
}

const messagesService = { createMessage, listMessages };

export default messagesService;
