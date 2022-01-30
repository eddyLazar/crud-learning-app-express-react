const request = require("supertest");
const app = require("./server");
// const { describe, expect, test } = require("@jest/globals");

describe("Testing Endpoints", () => {
  test("GET: /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ hello: "world" });
  });

  test("GET: /", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    const user = res.body[0];
    expect(res.body[0]).toMatchObject(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        birthdate: expect.any(String),
      })
    );
  });
});
