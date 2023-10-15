const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: {
      values: ["Full Cakes", "Cupcakes", "Banacakes"],
      message: "Invalid Category",
    },
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model("Product", ProductSchema);
