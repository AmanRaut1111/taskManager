const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateAccessToken = require("../utils/token");

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, Password, and Name are required...!",
        status: false,
        statusCode: 400,
      });
    }
    const extingUser = await User.find({ email: email });
    console.log(extingUser);

    if (extingUser.length > 0) {
      return res.status(404).json({
        message: "Invalid credentials...!",
        status: false,
        statusCode: 404,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    const data = await userData.save();
    res.status(200).json({
      message: "User Registered Successfully...!",
      status: true,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: " Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required...!",
        status: false,
        statusCode: 400,
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid credentials...!",
        status: false,
        statusCode: 404,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({
        message: "Invalid credentials...!",
        status: false,
        statusCode: 404,
      });
    }

    const token = generateAccessToken({ userId: user._id });
    res.status(200).json({
      message: "User Logged In Successfully...!",
      status: true,
      statusCode: 200,

      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});
module.exports = authRouter;
