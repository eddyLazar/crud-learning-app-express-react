const users = require("./db/users.json");
const express = require("express");
const fs = require("fs")
const app = express();

const saveUser = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('users.json', stringifyData)
}

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUserId = users.length
  users[newUserId] = req.body.user
  saveUser(users)
  res.send(`user with id ${req.params.id - 1} has been updated`)
});

app.put("/users/:id", (req, res) => {
  const newUsers = users
  newUsers[req.params.id - 1].name = req.body.name
  saveUser(newUsers)
  res.send(`user with id ${req.params.id - 1} has been updated`)
});

app.get("/users/:id", (req, res) => {
  res.json(users[req.params.id - 1]);
});

module.exports = app;
