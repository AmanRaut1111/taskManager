const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectDb = await mongoose.connect(
      "mongodb+srv://amanraut7576_db_user:dZJ7fogIU0wi9xkM@cluster0.zjbnmxg.mongodb.net/taskManger?retryWrites=true&w=majority"
    );
    console.log("Database Connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
