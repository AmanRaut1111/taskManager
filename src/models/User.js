const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    uniue: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  updatedat: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userSchema);
