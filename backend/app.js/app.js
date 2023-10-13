// app.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectDB = require("./database/connect");

// extra security packages
const cors = require("cors");

// Packages usage
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());

// Define a basic route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

async function run() {
  try {
    // Connect the client to the server
    await connectDB(process.env.MONGOOSE_URI || 8000);
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

run();
