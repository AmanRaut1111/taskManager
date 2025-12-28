const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./src/config/db");

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
