"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createMessage(userId, to, text, type) {
    return database_1.default.message.create({
        data: { userId, to, text, type },
        include: { user: { select: { username: true } } },
    });
}
async function listMessages(limit = 80) {
    return database_1.default.message.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        include: { user: { select: { id: true, username: true } } },
    });
}
const messagesRepository = { createMessage, listMessages };
exports.default = messagesRepository;
