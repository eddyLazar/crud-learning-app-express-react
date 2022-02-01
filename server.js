const express = require("express");
const fs = require("fs")
const app = express();

const getAllUsers = () => {
  const jsonData = fs.readFileSync('./db/users.json')
  return JSON.parse(jsonData)
}

const saveUser = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync('users.json', stringifyData)
}

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", (req, res) => {
  res.json(getAllUsers());
});

app.post("/users", (req, res) => {
  const users = getAllUsers()
  users.push(req.body)

  saveUser(users)

  res.send("User have been created")
});

app.put("/users/:id", (req, res) => {
  const newUsers = users
  newUsers[req.params.id - 1].name = req.body
  saveUser(newUsers)
  res.send(`user with id ${req.params.id - 1} has been updated`)
});

app.get("/users/:id", (req, res) => {
  const users = getAllUsers()
  const user = users.filter(user => user.id === req.params.id)
  console.log(user)
  res.json(user);
});

module.exports = app;
