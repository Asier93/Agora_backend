import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../../src/Models/auth.model.js"; // Asegúrate de ajustar la ruta correcta al modelo User

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

describe("User Model Tests", () => {
  it("should create a new user", async () => {
    const newUser = await User.create({
      email: "testuser@example.com",
      password: "testpassword",
      uname: "testuser",
    });

    expect(newUser).toBeDefined();
    expect(newUser.email).toBe("testuser@example.com");
    expect(newUser.password).toBe("testpassword");
    expect(newUser.uname).toBe("testuser");
    expect(newUser.date).toBeDefined(); // Verifica que el campo date está definido
    expect(new Date(newUser.date)).toBeInstanceOf(Date); // Verifica que date es una instancia de Date
  });

  // Agrega más pruebas según sea necesario
});
