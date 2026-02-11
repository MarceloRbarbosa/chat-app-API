"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../src/config/database"));
beforeAll(async () => {
    await database_1.default.$connect();
});
beforeEach(async () => {
    await database_1.default.message.deleteMany();
    await database_1.default.user.deleteMany();
});
afterAll(async () => {
    await database_1.default.$disconnect();
});
