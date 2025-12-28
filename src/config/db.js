const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDb = await mongoose.connect(
      "mongodb://localhost:27017/Task-Manager"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
