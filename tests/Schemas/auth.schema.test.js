import userSchema from "../../src/Schemas/auth.schema.js";

describe("User Schema", () => {
  it("should have the required fields", () => {
    const schema = userSchema.obj;
    expect(schema.email).toBeDefined();
    expect(schema.password).toBeDefined();
    expect(schema.uname).toBeDefined();
    expect(schema.date).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = userSchema.obj;
    expect(schema.email.type).toEqual(String);
    expect(schema.password.type).toEqual(String);
    expect(schema.uname.type).toEqual(String);
    expect(schema.date.type).toEqual(Date);
  });

  it("should have default values set correctly", () => {
    const schema = userSchema.obj;
    expect(schema.date.default).toEqual(expect.any(Function));
  });
});
