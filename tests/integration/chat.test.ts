import request from "supertest";
import app from "../../src/app";

function shortId(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

async function signup(username: string) {
  return request(app).post("/auth/signup").send({
    username,
    password: "123456",
    confirmPassword: "123456",
  });
}

async function signin(username: string) {
  return request(app).post("/auth/signin").send({
    username,
    password: "123456",
  });
}

async function signupAndSignin() {
  // garante <= 16 chars
  const base = `naruto-${shortId(8)}`; // ex: naruto-abc123xy (14)
  const username = base.slice(0, 16);

  const s1 = await signup(username);
  if (s1.status !== 201 && s1.status !== 409) {
    throw new Error(
      `Signup failed: ${s1.status} - body=${JSON.stringify(s1.body)} text=${s1.text}`
    );
  }

  let login = await signin(username);

  // Se algum outro arquivo limpou o banco em paralelo, você pode cair em 404 aqui.
  // Nesse caso, refaz signup + signin uma vez para estabilizar o teste.
  if (login.status === 404) {
    const s2 = await signup(username);
    if (s2.status !== 201 && s2.status !== 409) {
      throw new Error(
        `Signup retry failed: ${s2.status} - body=${JSON.stringify(s2.body)} text=${s2.text}`
      );
    }
    login = await signin(username);
  }

  if (login.status !== 200) {
    throw new Error(
      `Signin failed: ${login.status} - username=${username} body=${JSON.stringify(
        login.body
      )} text=${login.text}`
    );
  }

  const token = login.body?.token as string;
  if (!token) {
    throw new Error(
      `Token missing: username=${username} body=${JSON.stringify(login.body)} text=${login.text}`
    );
  }

  return { token, username };
}

describe("Chat - integration", () => {
  it("POST /chat without token -> 401", async () => {
    const res = await request(app).post("/chat").send({
      to: "Todos",
      text: "Oi",
      type: "message",
    });

    expect(res.status).toBe(401);
  });

  it("POST /chat with token -> 201", async () => {
    const { token, username } = await signupAndSignin();

    const res = await request(app)
      .post("/chat")
      .set("Authorization", `Bearer ${token}`)
      .send({ to: "Todos", text: "Oi", type: "message" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("from", username);
    expect(res.body).toHaveProperty("time");
  });

  it("GET /chat -> 200 list", async () => {
    const { token, username } = await signupAndSignin();

    await request(app)
      .post("/chat")
      .set("Authorization", `Bearer ${token}`)
      .send({ to: "Todos", text: "Oi", type: "message" });

    const res = await request(app)
      .get("/chat")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);

    // seu service devolve no formato UOL-like
    expect(res.body[0]).toHaveProperty("from", username);
  });
});
