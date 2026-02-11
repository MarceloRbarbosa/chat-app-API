"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userService_1 = __importDefault(require("../../src/services/userService"));
const userRepository_1 = __importDefault(require("../../src/repositories/userRepository"));
vitest_1.vi.mock("../../src/repositories/userRepository", () => ({
    default: {
        findUserByUsername: vitest_1.vi.fn(),
        createUser: vitest_1.vi.fn(),
    },
}));
vitest_1.vi.mock("bcrypt", () => ({
    default: {
        hash: vitest_1.vi.fn(),
        compare: vitest_1.vi.fn(),
    },
}));
vitest_1.vi.mock("jsonwebtoken", () => ({
    default: {
        sign: vitest_1.vi.fn(),
    },
}));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, vitest_1.describe)("userService - unit", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        process.env.JWT_SECRET = "test_secret";
    });
    (0, vitest_1.it)("postNewUser should create user with hashed password", async () => {
        userRepository_1.default.findUserByUsername.mockResolvedValue(null);
        bcrypt_1.default.hash.mockResolvedValue("hash123");
        userRepository_1.default.createUser.mockResolvedValue({ id: 1, username: "naruto" });
        const user = await userService_1.default.postNewUser("naruto", "123456");
        (0, vitest_1.expect)(userRepository_1.default.findUserByUsername).toHaveBeenCalledWith("naruto");
        (0, vitest_1.expect)(bcrypt_1.default.hash).toHaveBeenCalled();
        (0, vitest_1.expect)(userRepository_1.default.createUser).toHaveBeenCalledWith("naruto", "hash123");
        (0, vitest_1.expect)(user).toEqual({ id: 1, username: "naruto" });
    });
    (0, vitest_1.it)("postNewUser should throw conflict if username exists", async () => {
        userRepository_1.default.findUserByUsername.mockResolvedValue({ id: 1 });
        await (0, vitest_1.expect)(userService_1.default.postNewUser("naruto", "123456")).rejects.toMatchObject({
            type: "conflict",
        });
    });
    (0, vitest_1.it)("findUsers should throw not_found when user doesn't exist", async () => {
        userRepository_1.default.findUserByUsername.mockResolvedValue(null);
        await (0, vitest_1.expect)(userService_1.default.findUsers("naruto", "123456")).rejects.toMatchObject({
            type: "NOT_FOUND",
        });
    });
    (0, vitest_1.it)("findUsers should throw unauthorized when password doesn't match", async () => {
        userRepository_1.default.findUserByUsername.mockResolvedValue({ id: 1, password: "hash" });
        bcrypt_1.default.compare.mockResolvedValue(false);
        await (0, vitest_1.expect)(userService_1.default.findUsers("naruto", "wrong")).rejects.toMatchObject({
            type: "unauthorized",
        });
    });
    (0, vitest_1.it)("findUsers should return token when login ok", async () => {
        userRepository_1.default.findUserByUsername.mockResolvedValue({ id: 7, password: "hash" });
        bcrypt_1.default.compare.mockResolvedValue(true);
        jsonwebtoken_1.default.sign.mockReturnValue("token123");
        const token = await userService_1.default.findUsers("naruto", "123456");
        (0, vitest_1.expect)(jsonwebtoken_1.default.sign).toHaveBeenCalled();
        (0, vitest_1.expect)(token).toBe("token123");
    });
});
