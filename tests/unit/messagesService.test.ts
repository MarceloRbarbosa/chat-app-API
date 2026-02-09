import { describe, it, expect, vi, beforeEach } from "vitest";
import messagesService from "../../src/services/messagesService";
import messagesRepository from "../../src/repositories/messagesRepository";

vi.mock("../../src/repositories/messagesRepository", () => ({
  default: {
    createMessage: vi.fn(),
    listMessages: vi.fn(),
  },
}));

describe("messagesService - unit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createMessage: should normalize empty 'to' to 'Todos'", async () => {
    (messagesRepository.createMessage as any).mockResolvedValue({
      id: 1,
      to: "Todos",
      text: "Olá",
      type: "message",
      createdAt: new Date("2020-01-01T12:34:56.000Z"),
      user: { username: "naruto" },
    });

    const result = await messagesService.createMessage({
      userId: 10,
      to: "",
      text: "Olá",
      type: "message",
    });

    expect(messagesRepository.createMessage).toHaveBeenCalledWith(
      10,
      "Todos",
      "Olá",
      "message"
    );

    expect(result).toHaveProperty("to", "Todos");
    expect(result).toHaveProperty("from", "naruto");
    expect(result).toHaveProperty("time", "12:34:56");
  });

  it("createMessage: should normalize 'todos' to 'Todos'", async () => {
    (messagesRepository.createMessage as any).mockResolvedValue({
      id: 2,
      to: "Todos",
      text: "Oi",
      type: "message",
      createdAt: new Date("2020-01-01T00:00:00.000Z"),
      user: { username: "naruto" },
    });

    await messagesService.createMessage({
      userId: 10,
      to: "todos",
      text: "Oi",
      type: "message",
    });

    expect(messagesRepository.createMessage).toHaveBeenCalledWith(
      10,
      "Todos",
      "Oi",
      "message"
    );
  });

  it("listMessages: should call repository with limit 80", async () => {
    (messagesRepository.listMessages as any).mockResolvedValue([]);

    const result = await messagesService.listMessages();

    expect(messagesRepository.listMessages).toHaveBeenCalledWith(80);
    expect(result).toEqual([]);
  });
});
