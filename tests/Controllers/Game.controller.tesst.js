import request from "supertest";
import app from "../../index.js";
import Jwt from "jsonwebtoken";
import Game from "../../src/Models/game.model.js";
import jest from "jest";

jest.mock("jsonwebtoken", () => ({
  decode: jest.fn().mockReturnValue({ _id: "someUserId" }),
}));

describe("newgame controller", () => {
  it("should create a new game", async () => {
    const token = "someAuthToken";
    Jwt.decode.mockReturnValueOnce({ _id: "someUserId" });

    const response = await request(app)
      .post("/newgame")
      .set("auth-token", token);

    expect(Game.mock.calls.length).toBe(1);
    expect(Game.mock.calls[0][0].user).toBe("someUserId");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("game");
  });

  it("should handle errors", async () => {
    const mockError = new Error("Some error occurred");
    jest.spyOn(Game.prototype, "save").mockRejectedValueOnce(mockError);

    const token = "someAuthToken";
    Jwt.decode.mockReturnValueOnce({ _id: "someUserId" });

    const response = await request(app)
      .post("/newgame")
      .set("auth-token", token);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: mockError });
  });
});
