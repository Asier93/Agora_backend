import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { register, login } from "../../src/Controllers/Auth.controller.js";
import User from "../../src/Models/auth.model.js";
import { jest } from "@jest/globals";

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("salt"),
  hash: jest.fn().mockResolvedValue("hashedPassword"),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("./src/Models/auth.model.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
}));
User.findOne = jest.fn();

describe("Auth Controller", () => {
  describe("register", () => {
    it("should register a new user", async () => {
      const req = {
        body: {
          uname: "testuser",
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const userData = {
        uname: req.body.uname,
        email: req.body.email,
        password: "hashedPassword",
      };
      User.findOne.mockResolvedValueOnce(null);
      bcryptjs.genSalt.mockResolvedValueOnce("salt");
      bcryptjs.hash.mockResolvedValueOnce("hashedPassword");
      const saveMock = jest.fn().mockResolvedValueOnce(userData);
      User.save = saveMock;
      await register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(User.findOne).toHaveBeenCalledWith({ uname: "testuser" });
      expect(bcryptjs.genSalt).toHaveBeenCalledWith("salt");
      expect(bcryptjs.hash).toHaveBeenCalledWith("testpassword", "salt");
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "You've been registered successfully",
      });
    });

    it("should return 400 if email or username already exists", async () => {
      const req = {
        body: {
          uname: "testuser",
          email: "test@example.com",
          password: "testpassword",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      User.findOne.mockResolvedValueOnce({ email: "test@example.com" });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "The email or username already exists",
      });
    });
  });
});
