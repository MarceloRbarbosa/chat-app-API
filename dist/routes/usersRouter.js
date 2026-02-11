"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const userSchema_1 = require("../schemas/userSchema");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (0, validateSchemaMiddleware_1.validateSchema)(userSchema_1.signUpSchema), userController_1.default.signUp);
userRouter.post("/signin", (0, validateSchemaMiddleware_1.validateSchema)(userSchema_1.signInSchema), userController_1.default.signIn);
exports.default = userRouter;
