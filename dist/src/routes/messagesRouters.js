"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const messagesSchema_1 = require("../schemas/messagesSchema");
const messageRouter = (0, express_1.Router)();
messageRouter.post("/chat", tokenMiddleware_1.authenticateToken, (0, validateSchemaMiddleware_1.validateSchema)(messagesSchema_1.createMessageSchema), messagesController_1.default.postMessage);
messageRouter.get("/chat", tokenMiddleware_1.authenticateToken, messagesController_1.default.getMessages);
exports.default = messageRouter;
