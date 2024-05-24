import mongoose from "mongoose";
import { connectDB } from "../../src/DataBase/connection.js";
import dotenv from "dotenv";
dotenv.config();

describe("Testing database connection", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to the database", async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toEqual(1);
  });
});
