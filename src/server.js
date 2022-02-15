const express = require("express");
const app = express();
const usersDB = require("./UserDB")

app.use(express.json())


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
    res.send(await usersDB.getAll());
  } catch (error) {
    errorHandler(res, error);
  };
});

app.post("/users", async (req, res) => {
  try {
    res.send(await usersDB.post(
      req.body));
  } catch (error) {
    errorHandler(res, error);
  };
});

app.put("/users/:id", async (req, res) => {
  try {
    const response = await usersDB.put(
      parseInt(req.params.id), req.body)
    if (response === 404) {
      res.status(404).send({
        message: 'User not exist'
      });
    };
    res.send(response);
  } catch (error) {
    errorHandler(res, error);
  };
});

app.get("/users/:id", async (req, res) => {
  try {
    const response = await usersDB.getById(
      parseInt(req.params.id));
    if (response === 404) {
      res.status(404).send({
        message: 'User not exist'
      });
    }
    res.status(200).send(response);
  } catch (error) {
    errorHandler(res, error);
  };
});

app.delete("/users/:id", async (req, res) => {
  try {
    const response = await usersDB.delete(
      parseInt(req.params.id));
    if (response === 404) {
      res.status(404).send({
        message: 'User not exist'
      });
    };
    res.send(response);
  } catch (error) {
    errorHandler(res, error);
  };
});

module.exports = app;
