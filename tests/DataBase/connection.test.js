import mongoose from "mongoose";
import { connectDB } from "../../src/DataBase/connection.js";
import dotenv from 'dotenv';
dotenv.config();

describe("Testing database connection", () => {
  beforeAll(async () => {
    // Connect to a test database before running any tests
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close database connection after all tests are done
    await mongoose.connection.close();
  });

  it("should connect to the database", async () => {
    // Call the connectDB function
    await connectDB();
    // Check if Mongoose connection is successful
    expect(mongoose.connection.readyState).toEqual(1);
  });
});
