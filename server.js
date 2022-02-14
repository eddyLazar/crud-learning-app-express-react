const express = require("express");
const app = express();
const usersDB = require("./UserDB")

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", async (req, res) => {
  res.send(await usersDB.getAll());
});

app.post("/users", async (req, res) => {
  res.send(await usersDB.post(req.body));
});

app.put("/users/:id", async (req, res) => {
  res.send(await usersDB.put(parseInt(req.params.id), req.body));
});

app.get("/users/:id", async (req, res) => {
  res.send(await usersDB.getById(parseInt(req.params.id)));
});

app.delete("/users/:id", async (req, res) => {
  res.send(await usersDB.delete(parseInt(req.params.id)));
});

module.exports = app;
