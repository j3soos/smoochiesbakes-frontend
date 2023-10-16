require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connect");
const port = process.env.BACKEND_PORT || 3001;
// const timeout = require('connect-timeout');
const errorHandlerMiddleware = require('./middleware/error_handler')
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Packages usage
app.set("trust proxy", 1);
app.use(express.json());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
// app.use(timeout("10000")); // Timeout duration in milliseconds (e.g., 10000 ms = 10 seconds)

// routes
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter)

app.get("/", (req, res) => {
  return res.json({ message: "Hello from the backend!" });
});

app.use(errorHandlerMiddleware)

async function run() {
  try {
    await connectDB(process.env.MONGOOSE_URI || 3001);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

run();
