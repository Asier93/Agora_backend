import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Block from "../../src/Models/block.model.js";

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

describe("Block Model Tests", () => {
  it("should create a new block", async () => {
    const newBlock = await Block.create({
      name: "Test Block",
      levelId: new mongoose.Types.ObjectId(),
    });

    expect(newBlock).toBeDefined();
    expect(newBlock.name).toBe("Test Block");
    expect(new mongoose.Types.ObjectId(newBlock.levelId)).toBeInstanceOf(
      mongoose.Types.ObjectId
    );
    expect(newBlock.createdAt).toBeDefined();
    expect(newBlock.updatedAt).toBeDefined();
  });
});
