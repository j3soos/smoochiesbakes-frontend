const express = require("express");
const connectDB = require("./database/connect");
require("dotenv").config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;

app.get("/", (req, res) => {
  return res.json({ message: "Hello from the backend!" });
});

async function run(){
  try {
    await connectDB(process.env.MONGOOSE_URI || 3001);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

run()