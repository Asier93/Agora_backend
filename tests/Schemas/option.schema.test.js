import optionSchema from "../../src/Schemas/option.schema.js";
import mongoose from "mongoose"; // Importa mongoose aquí

describe("Option Schema", () => {
  it("should have the required fields", () => {
    const schema = optionSchema.obj;
    expect(schema.name).toBeDefined();
    expect(schema.description).toBeDefined();
    expect(schema.blockId).toBeDefined();
    expect(schema.categoryId).toBeDefined();
    expect(schema.cardURL).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = optionSchema.obj;
    expect(schema.name.type).toEqual(String);
    expect(schema.description.type).toEqual(String);
    expect(schema.blockId.type).toEqual(mongoose.Schema.Types.ObjectId);
    expect(schema.categoryId.type).toEqual(mongoose.Schema.Types.ObjectId);
    expect(schema.cardURL.type).toEqual(String);
  });

  it("should reference the Block and Category models", () => {
    const schema = optionSchema.obj;
    expect(schema.blockId.ref).toEqual("Block");
    expect(schema.categoryId.ref).toEqual("Category");
  });

  it("should have timestamps enabled", () => {
    const options = optionSchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
