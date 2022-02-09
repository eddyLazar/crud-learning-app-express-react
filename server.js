const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/users", async (req, res) => {
  const users = await getUserData();
  res.send(users);
});

app.post("/users", async (req, res) => {
  const existUsers = await getUserData();
  const userData = { id: existUsers.length + 1, ...req.body };
  existUsers.push(userData);
  saveUserData(existUsers);
  res.send(userData);
});

app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const newUserData = req.body;
  const existUsers = getUserData();
  const findExist = existUsers.findIndex(user => user.id === userId);
  if (findExist == -1) {
    return res.status(404).send({ error: true, msg: 'id not exist' });
  }
  let updateUser = existUsers[findExist];
  updateUser = {
    ...updateUser,
    ...newUserData
  }
  saveUserData(existUsers);
  res.send(updateUser);
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const existUsers = getUserData();
  const findExist = existUsers.find(user => user.id === userId);
  if (!findExist) {
    return res.status(409).send({ error: true, msg: 'user not exist' });
  }
  res.send(findExist);
});

app.delete("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const existUsers = await getUserData();
  const filterUser = existUsers.filter(user => user.id !== userId);
  if (existUsers.length === filterUser.length) {
    return res.status(409).send({ error: true, msg: 'user does not exist' });
  }
  saveUserData(filterUser);
  res.status(200).send({ id: filterUser.indexOf(userId) });
});

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync('./db/users.json', stringifyData);
};

const getUserData = async () => {
  const jsonData = await fs.promises.readFile('./db/users.json');
  return JSON.parse(jsonData);
};

module.exports = app;
