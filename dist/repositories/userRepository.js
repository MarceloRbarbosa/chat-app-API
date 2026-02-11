"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createUser(username, password) {
    const newUser = database_1.default.user.create({
        data: { username, password },
    });
    return newUser;
}
async function findAllUsers() {
    const users = database_1.default.user.findMany();
    return users;
}
async function findUserByUsername(username) {
    const user = database_1.default.user.findUnique({ where: { username } });
    return user;
}
async function findUserById(id) {
    const user = database_1.default.user.findUnique({ where: { id } });
    return user;
}
const usersRepository = {
    createUser, findAllUsers, findUserById, findUserByUsername
};
exports.default = usersRepository;
