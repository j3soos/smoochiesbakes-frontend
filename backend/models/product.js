const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required:true, unique:true },
  category: {
    type: String,
    enum: {
      values: ["Full Cakes", "Cupcakes", "Banana Cakes"],
      message: "Invalid Category",
    },
    required: true,
  },
  price: { type: Number, required: true },
  image_url: {type: String, required:false},
  description: { type: String, required: false },
});

module.exports = mongoose.model("Product", ProductSchema);
