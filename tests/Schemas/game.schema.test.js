import gameSchema from "../../src/Schemas/game.schema.js";
import mongoose from "mongoose"; 

describe("Game Schema", () => {
  it("should have the required fields", () => {
    const schema = gameSchema.obj;
    expect(schema.user).toBeDefined();
  });

  it("should have correct types for fields", () => {
    const schema = gameSchema.obj;
    expect(schema.user.type).toEqual(mongoose.Schema.Types.ObjectId);
  });

  it("should reference the User model", () => {
    const schema = gameSchema.obj;
    expect(schema.user.ref).toEqual("User");
  });

  it("should have timestamps enabled", () => {
    const options = gameSchema.options;
    expect(options.timestamps).toEqual(true);
  });
});
