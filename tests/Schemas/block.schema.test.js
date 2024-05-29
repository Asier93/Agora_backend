import blockSchema from "../../src/Schemas/block.schema.js";
import mongoose from "mongoose";

describe("Block Schema", () => {
  it("should have the required fields", () => {
    const schema = blockSchema.obj;
    expect(schema.name).toBeDefined();
    expect(schema.levelId).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = blockSchema.obj;
    expect(schema.name.type).toEqual(String);
    expect(schema.levelId.type).toEqual(mongoose.Schema.Types.ObjectId);
  });

  it("should reference the Level model", () => {
    const schema = blockSchema.obj;
    expect(schema.levelId.ref).toEqual("Level");
  });

  it("should have timestamps enabled", () => {
    const options = blockSchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
