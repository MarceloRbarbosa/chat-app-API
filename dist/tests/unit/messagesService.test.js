"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const messagesService_1 = __importDefault(require("../../src/services/messagesService"));
const messagesRepository_1 = __importDefault(require("../../src/repositories/messagesRepository"));
vitest_1.vi.mock("../../src/repositories/messagesRepository", () => ({
    default: {
        createMessage: vitest_1.vi.fn(),
        listMessages: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)("messagesService - unit", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("createMessage: should normalize empty 'to' to 'Todos'", async () => {
        messagesRepository_1.default.createMessage.mockResolvedValue({
            id: 1,
            to: "Todos",
            text: "Olá",
            type: "message",
            createdAt: new Date("2020-01-01T12:34:56.000Z"),
            user: { username: "naruto" },
        });
        const result = await messagesService_1.default.createMessage({
            userId: 10,
            to: "",
            text: "Olá",
            type: "message",
        });
        (0, vitest_1.expect)(messagesRepository_1.default.createMessage).toHaveBeenCalledWith(10, "Todos", "Olá", "message");
        (0, vitest_1.expect)(result).toHaveProperty("to", "Todos");
        (0, vitest_1.expect)(result).toHaveProperty("from", "naruto");
        (0, vitest_1.expect)(result).toHaveProperty("time", "12:34:56");
    });
    (0, vitest_1.it)("createMessage: should normalize 'todos' to 'Todos'", async () => {
        messagesRepository_1.default.createMessage.mockResolvedValue({
            id: 2,
            to: "Todos",
            text: "Oi",
            type: "message",
            createdAt: new Date("2020-01-01T00:00:00.000Z"),
            user: { username: "naruto" },
        });
        await messagesService_1.default.createMessage({
            userId: 10,
            to: "todos",
            text: "Oi",
            type: "message",
        });
        (0, vitest_1.expect)(messagesRepository_1.default.createMessage).toHaveBeenCalledWith(10, "Todos", "Oi", "message");
    });
    (0, vitest_1.it)("listMessages: should call repository with limit 80", async () => {
        messagesRepository_1.default.listMessages.mockResolvedValue([]);
        const result = await messagesService_1.default.listMessages();
        (0, vitest_1.expect)(messagesRepository_1.default.listMessages).toHaveBeenCalledWith(80);
        (0, vitest_1.expect)(result).toEqual([]);
    });
});
