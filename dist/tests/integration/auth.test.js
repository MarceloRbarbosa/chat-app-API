"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe("Auth - integration", () => {
    it("POST /auth/signup -> 201", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/auth/signup").send({
            username: "naruto",
            password: "123456",
            confirmPassword: "123456",
        });
        expect(res.status).toBe(201);
    });
    it("POST /auth/signin -> 200 token", async () => {
        await (0, supertest_1.default)(app_1.default).post("/auth/signup").send({
            username: "naruto",
            password: "123456",
            confirmPassword: "123456",
        });
        const res = await (0, supertest_1.default)(app_1.default).post("/auth/signin").send({
            username: "naruto",
            password: "123456",
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
