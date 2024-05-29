import levelSchema from "../../src/Schemas/level.schema.js";

describe("Level Schema", () => {
  it("should have the required fields", () => {
    const schema = levelSchema.obj;
    expect(schema.name).toBeDefined();
    expect(schema.number).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = levelSchema.obj;
    expect(schema.name.type).toEqual(String);
    expect(schema.number.type).toEqual(Number);
  });

  it("should have timestamps enabled", () => {
    const options = levelSchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
