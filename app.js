const express = require("express");
const authRouter = require("./src/routes/auth");
const taskRouter = require("./src/routes/task");

const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

module.exports = app;
