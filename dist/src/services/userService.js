"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function postNewUser(username, password) {
    const conflict = await userRepository_1.default.findUserByUsername(username);
    if (conflict) {
        throw { type: "conflict", message: "this username already exists please choose a new one" };
    }
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const newUser = await userRepository_1.default.createUser(username, passwordHash);
    return newUser;
}
async function findUsers(username, password) {
    const user = await userRepository_1.default.findUserByUsername(username);
    if (!user)
        throw { type: "NOT_FOUND", message: "User not found" };
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch)
        throw { type: "unauthorized", message: "Invalid Password" };
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "500m" });
    return token;
}
const userService = {
    postNewUser, findUsers
};
exports.default = userService;
