import mongoose from "mongoose";

const uri = process.env.MONGOOSE_URI;

// create a mongoose connection
const db = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// some mongoose error handlers
db.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

db.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

// Export the Mongoose connection
export default db;
