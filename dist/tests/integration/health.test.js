"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const api = (0, supertest_1.default)(app_1.default);
describe("GET /health", () => {
    it("should return status 200 and a message", async () => {
        const { status, text } = await api.get("/health");
        expect(status).toBe(200);
        expect(text).toBe(" I'm OK!");
    });
});
