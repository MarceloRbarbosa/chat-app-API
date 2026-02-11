"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRouter_1 = __importDefault(require("./usersRouter"));
const healthRouters_1 = __importDefault(require("./healthRouters"));
const messagesRouters_1 = __importDefault(require("./messagesRouters"));
const routers = (0, express_1.Router)();
routers.use(healthRouters_1.default);
routers.use("/auth", usersRouter_1.default);
routers.use(messagesRouters_1.default);
exports.default = routers;
