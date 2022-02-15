const request = require("supertest");
const app = require("./server");
// const { describe, expect, test } = require("@jest/globals");

const userMatchingObject = expect.objectContaining({
  id: expect.any(Number),
  name: expect.any(String),
  username: expect.any(String),
  email: expect.any(String),
  birthdate: expect.any(String),
});

let newUserId;

describe("Testing Endpoints", () => {
  test("GET: /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ hello: "world" });
  });

  test("GET: /users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    const user = res.body[0];
    expect(user).toMatchObject(userMatchingObject);
  });

  test("POST: /users", async () => {
    const newUser = {
      name: "Test User",
      username: "testy",
      email: "testy@test.com",
      birthdate: "1992-30-06",
      address: {
        street: "Test street",
        suite: "test",
        city: "test",
        zipcode: "test",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "12321312312",
      website: "test.org",
      company: {
        name: "Testing",
        catchPhrase: "test verything",
        bs: "test verything right",
      },
    };
    const res = await request(app).post("/users").send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(newUser);
  });

  test("GET: /users/{id}", async () => {
    const res = await request(app).get("/users/1");
    expect(res.statusCode).toEqual(200);
    const user = res.body;
    expect(user).toMatchObject(userMatchingObject);
  });

  test("PUT: /users/{id}", async () => {
    const newName = "some new name";
    const res = await request(app).put("/users/11").send({
      name: newName,
    });
    expect(res.statusCode).toEqual(200);
    const user = res.body;
    expect(user).toHaveProperty("name", newName);
  });

  test("DELETE: /users/{id}", async () => {
    const res = await request(app).delete("/users/11");
    expect(res.statusCode).toEqual(200);
    const id = res.body
    expect(id).toEqual({ "id": -1 })
  })
});


