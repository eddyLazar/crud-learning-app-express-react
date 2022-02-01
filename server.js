const users = require("./db/users.json")
const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  users.push(req.body)
  res.send("User have been created")
});

app.put("/users/:id", (req, res) => {
  res.send(`user with id ${req.params.id - 1} has been updated`)
});

app.get("/users/:id", (req, res) => {
  res.json(users[req.params.id - 1]);
});

app.delete("/users/:id", (req, res) => {
  delete users[req.params.id - 1]
  res.send(`user with id ${req.params.id} was deleted`)
})

module.exports = app;
