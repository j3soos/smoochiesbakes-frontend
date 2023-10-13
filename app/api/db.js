const mongoose = require("mongoose");

const connectDB = () => {
  const url = process.env.MONGOOSE_URI;
  mongoose.connect(url);
};

module.exports = connectDB;
