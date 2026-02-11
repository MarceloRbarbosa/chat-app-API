"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler_1 = require("../utils/asyncHandler");
const http_status_1 = __importDefault(require("http-status"));
const userService_1 = __importDefault(require("../services/userService"));
const signUp = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { username, password } = req.body;
    await userService_1.default.postNewUser(username, password);
    res.sendStatus(http_status_1.default.CREATED);
});
const signIn = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { username, password } = req.body;
    const token = await userService_1.default.findUsers(username, password);
    res.status(http_status_1.default.OK).json({ token });
});
exports.default = { signUp, signIn };
