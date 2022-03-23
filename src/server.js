const express = require("express");
const UsersDb = require("./UserDB");
const app = express();

app.use(express.json())

const userDB = new UsersDb('./db/users.json')

const errorHandler = (res, error) => {
  res.status(500).json({
    success: false,
    message: error.message ? error.message : error
  });
};

app.get("/", (req, res) => {
  try {
    res.json({ hello: "world" });
  } catch (error) {
    errorHandler(res, error);
  };
});

app.get("/users", async (req, res) => {
  try {
    res.send(await userDB.getAll());
  } catch (error) {
    errorHandler(res, error);
  };
});

app.post("/users", async (req, res) => {
  try {
    res.send(await userDB.add(
      req.body));
  } catch (error) {
    console.log(error)
    errorHandler(res, error);
  };
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await userDB.updateUser(
      parseInt(req.params.id), req.body)
    if (user === undefined) {
      return res.status(404).send({
        message: 'User not exist'
      })
    };
    res.send(user);
  } catch (error) {
    errorHandler(res, error);
  };
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await userDB.getOne(
      parseInt(req.params.id));
    if (user === undefined) {
      return res.status(404).send({
        message: 'User not exist'
      })
    };
    res.status(200).send(user);
  } catch (error) {
    errorHandler(res, error);
  };
});

app.delete("/users/:id", async (req, res) => {
  try {
    const response = await userDB.deleteUser(
      parseInt(req.params.id));
    if (response === undefined) {
      return res.status(404).send({
        message: 'User not exist'
      });
    };
    res.send(response);
  } catch (error) {
    errorHandler(res, error);
  };
});

module.exports = app;
