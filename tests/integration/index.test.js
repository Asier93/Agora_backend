import request from "supertest";
import app from "../../index.js";

describe("Test de integración para mi aplicación Express", () => {
  it("Debe responder con status 200 en la ruta /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
