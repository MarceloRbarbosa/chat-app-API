"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDb = cleanDb;
const database_1 = __importDefault(require("../../src/config/database"));
async function cleanDb() {
    await database_1.default.message.deleteMany();
    await database_1.default.user.deleteMany();
}
