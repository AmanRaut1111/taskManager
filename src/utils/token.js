const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: process.env.accessTokenExpiresIn,
  });
};

module.exports = generateAccessToken;
