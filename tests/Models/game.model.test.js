import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Game from "../../src/Models/game.model.js";

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

describe("Game Model Tests", () => {
  it("should create a new game", async () => {
    const newGame = await Game.create({
      user: new mongoose.Types.ObjectId(),
    });

    expect(newGame).toBeDefined();
    expect(new mongoose.Types.ObjectId(newGame.user)).toBeInstanceOf(
      mongoose.Types.ObjectId
    );
    expect(newGame.createdAt).toBeDefined();
    expect(newGame.updatedAt).toBeDefined();
  });
});
