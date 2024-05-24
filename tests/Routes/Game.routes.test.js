import request from "supertest";
import app from "../../index.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
});

describe("POST /newgame", () => {
  let mongoServer;
  let mongoTestInstance;
  let validToken;

  beforeAll(async () => {
    try {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      console.log(`MongoMemoryServer URI: ${uri}`);

      mongoTestInstance = new mongoose.Mongoose();
      await mongoTestInstance.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      validToken = jwt.sign({ _id: "mockUserId" }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });
      console.log("Generated test token:", validToken);

      console.log("Connected to the memory database");
    } catch (error) {
      console.error("Error connecting to memory database:", error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await mongoTestInstance.disconnect();
      await mongoose.disconnect();
      await mongoServer.stop();
      console.log("Disconnected from the memory database");
    } catch (error) {
      console.error("Error disconnecting from memory database:", error);
    }
  });

  it("should create a new game", async () => {
    const response = await request(app)
      .post("/newgame")
      .set("auth-token", validToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("game");
    expect(response.body.game).toHaveProperty("id");
    expect(response.body.game).toHaveProperty("name");
  });

  it("should return 401 if no auth token is provided", async () => {
    const response = await request(app).post("/newgame");
    expect(response.status).toBe(401);
  });
});
