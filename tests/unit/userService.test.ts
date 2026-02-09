import { describe, it, expect, vi, beforeEach } from "vitest";

import userService from "../../src/services/userService";
import usersRepository from "../../src/repositories/userRepository";

vi.mock("../../src/repositories/userRepository", () => ({
  default: {
    findUserByUsername: vi.fn(),
    createUser: vi.fn(),
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("userService - unit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "test_secret";
  });

  it("postNewUser should create user with hashed password", async () => {
    (usersRepository.findUserByUsername as any).mockResolvedValue(null);
    (bcrypt.hash as any).mockResolvedValue("hash123");
    (usersRepository.createUser as any).mockResolvedValue({ id: 1, username: "naruto" });

    const user = await userService.postNewUser("naruto", "123456");

    expect(usersRepository.findUserByUsername).toHaveBeenCalledWith("naruto");
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(usersRepository.createUser).toHaveBeenCalledWith("naruto", "hash123");
    expect(user).toEqual({ id: 1, username: "naruto" });
  });

  it("postNewUser should throw conflict if username exists", async () => {
    (usersRepository.findUserByUsername as any).mockResolvedValue({ id: 1 });

    await expect(userService.postNewUser("naruto", "123456")).rejects.toMatchObject({
      type: "conflict",
    });
  });

  it("findUsers should throw not_found when user doesn't exist", async () => {
    (usersRepository.findUserByUsername as any).mockResolvedValue(null);

    await expect(userService.findUsers("naruto", "123456")).rejects.toMatchObject({
      type: "NOT_FOUND",
    });
  });

  it("findUsers should throw unauthorized when password doesn't match", async () => {
    (usersRepository.findUserByUsername as any).mockResolvedValue({ id: 1, password: "hash" });
    (bcrypt.compare as any).mockResolvedValue(false);

    await expect(userService.findUsers("naruto", "wrong")).rejects.toMatchObject({
      type: "unauthorized",
    });
  });

  it("findUsers should return token when login ok", async () => {
    (usersRepository.findUserByUsername as any).mockResolvedValue({ id: 7, password: "hash" });
    (bcrypt.compare as any).mockResolvedValue(true);
    (jwt.sign as any).mockReturnValue("token123");

    const token = await userService.findUsers("naruto", "123456");

    expect(jwt.sign).toHaveBeenCalled();
    expect(token).toBe("token123");
  });
});
