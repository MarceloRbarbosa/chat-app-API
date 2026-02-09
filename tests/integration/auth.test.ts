import request from "supertest";
import app from "../../src/app";

describe("Auth - integration", () => {
  it("POST /auth/signup -> 201", async () => {
    const res = await request(app).post("/auth/signup").send({
      username: "naruto",
      password: "123456",
      confirmPassword: "123456",
    });

    expect(res.status).toBe(201);
  });

  it("POST /auth/signin -> 200 token", async () => {
    await request(app).post("/auth/signup").send({
      username: "naruto",
      password: "123456",
      confirmPassword: "123456",
    });

    const res = await request(app).post("/auth/signin").send({
      username: "naruto",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
