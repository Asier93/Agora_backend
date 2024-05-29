import request from "supertest";
import express from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import User from "../../src/Models/auth.model.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { register, login } from "../../src/Controllers/Auth.controller.js";
import mongoose from "mongoose";
import { jest } from "@jest/globals";

const app = express();

app.use(express.json());

app.post("/auth/", register);
app.post("/auth/login", login);

describe("Auth Controller", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("Register", () => {
    it("should register a new user", async () => {
      const userData = {
        uname: "testUser",
        email: "test@example.com",
        password: "testPassword",
      };

      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
      jest.spyOn(User, "findOne").mockResolvedValueOnce(null);

      const response = await request(app).post("/auth/").send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "You've been registered successfully",
      });
    });

    it("should handle registration error", async () => {
      const userData = {
        uname: "testUser",
        email: "test@example.com",
        password: "testPassword",
      };

      jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
        throw new Error("The email or username already exists");
      });

      const response = await request(app).post("/auth/").send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "The email or username already exists",
      });
    });
  });

  describe("Login", () => {
    it("should log in a user", async () => {
      const loginData = {
        identifier: "test@example.com",
        password: "testPassword",
      };

      jest.spyOn(User, "findOne").mockResolvedValueOnce({
        _id: "userId",
        uname: "testUser",
        email: "test@example.com",
        password: "hashedPassword",
      });

      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(true);
      jest.spyOn(Jwt, "sign").mockReturnValueOnce("testToken");

      const response = await request(app).post("/auth/login").send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: "testToken" });
    });

    it("should handle login error", async () => {
      const loginData = {
        identifier: "test@example.com",
        password: "testPassword",
      };

      jest.spyOn(User, "findOne").mockResolvedValueOnce(null);

      const response = await request(app).post("/auth/login").send(loginData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Incorrect Email or username" });
    });
  });
});
