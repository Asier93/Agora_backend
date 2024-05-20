import categorySchema from "../../src/Schemas/category.schema.js";

describe("Category Schema", () => {
  it("should have the required fields", () => {
    const schema = categorySchema.obj;
    expect(schema.name).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = categorySchema.obj;
    expect(schema.name.type).toEqual(String);
  });

  it("should have timestamps enabled", () => {
    const options = categorySchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
