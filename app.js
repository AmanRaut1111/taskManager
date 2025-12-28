const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();
const authRouter = require("./src/routes/auth");
const taskRouter = require("./src/routes/task");

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

connectDB();

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on port ${process.env.PORT}`);
});
