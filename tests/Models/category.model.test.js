import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Category from "../../src/Models/category.model.js"; // Asegúrate de ajustar la ruta correcta al modelo Category

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

describe("Category Model Tests", () => {
  it("should create a new category", async () => {
    const newCategory = await Category.create({
      name: "Test Category",
    });

    expect(newCategory).toBeDefined();
    expect(newCategory.name).toBe("Test Category");
    expect(newCategory.createdAt).toBeDefined(); // Verifica que el campo createdAt está definido
    expect(newCategory.updatedAt).toBeDefined(); // Verifica que el campo updatedAt está definido
  });

  // Agrega más pruebas según sea necesario
});
