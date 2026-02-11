"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const messagesService_1 = __importDefault(require("../services/messagesService"));
async function postMessage(req, res) {
    const userId = req.userId;
    const { to, text, type } = req.body;
    const message = await messagesService_1.default.createMessage({ userId, to, text, type });
    return res.status(http_status_1.default.CREATED).send(message);
}
async function getMessages(req, res) {
    const messages = await messagesService_1.default.listMessages();
    return res.status(http_status_1.default.OK).send(messages);
}
const messagesController = { postMessage, getMessages };
exports.default = messagesController;
