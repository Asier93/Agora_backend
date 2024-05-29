import { jest } from "@jest/globals";

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn().mockResolvedValue("salt"),
  hash: jest.fn().mockResolvedValue("hashedPassword"),
  compare: jest.fn(),
}));

jest.mock("./src/Models/auth.model.js", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    save: jest.fn(),
  },
}));

jest.mock("./src/Middlewares/Auth.middleware.js", () => (req, res, next) => {
  req.user = { _id: "mockUserId" };
  next();
});
