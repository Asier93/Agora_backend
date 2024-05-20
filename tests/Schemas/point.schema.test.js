import pointSchema from "../../src/Schemas/point.schema.js";
import mongoose from "mongoose"; // Importa mongoose aquí

describe("Point Schema", () => {
  it("should have the required fields", () => {
    const schema = pointSchema.obj;
    expect(schema.userId).toBeDefined();
    expect(schema.gameId).toBeDefined();
    expect(schema.optionId).toBeDefined();
    expect(schema.value).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = pointSchema.obj;
    expect(schema.userId.type).toEqual(mongoose.Schema.Types.ObjectId);
    expect(schema.gameId.type).toEqual(mongoose.Schema.Types.ObjectId);
    expect(schema.optionId.type).toEqual(mongoose.Schema.Types.ObjectId);
    expect(schema.value.type).toEqual(String);
  });

  it("should reference the User, Game, and Option models", () => {
    const schema = pointSchema.obj;
    expect(schema.userId.ref).toEqual("User");
    expect(schema.gameId.ref).toEqual("Game");
    expect(schema.optionId.ref).toEqual("Option");
  });

  it("should have timestamps enabled", () => {
    const options = pointSchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
