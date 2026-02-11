"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messagesRepository_1 = __importDefault(require("../repositories/messagesRepository"));
function formatTime(date) {
    return date.toISOString().slice(11, 19); // HH:mm:ss
}
function normalizeTo(to) {
    const trimmed = (to !== null && to !== void 0 ? to : "").trim();
    if (!trimmed)
        return "Todos";
    if (trimmed.toLowerCase() === "todos")
        return "Todos";
    return trimmed;
}
async function createMessage({ userId, to, text, type }) {
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
    const msg = await messagesRepository_1.default.createMessage(userId, finalTo, text.trim(), type);
    return {
        from: msg.user.username,
        to: msg.to,
        text: msg.text,
        type: msg.type,
        time: formatTime(msg.createdAt),
    };
}
async function listMessages() {
    const messages = await messagesRepository_1.default.listMessages(80);
    return messages.map((msg) => ({
        from: msg.user.username,
        to: msg.to,
        text: msg.text,
        type: msg.type,
        time: formatTime(msg.createdAt),
    }));
}
const messagesService = { createMessage, listMessages };
exports.default = messagesService;
