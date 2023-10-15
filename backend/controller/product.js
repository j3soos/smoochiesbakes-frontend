const { StatusCodes } = require("http-status-codes");
const Product = require("../models/product");

// create a product
const createProduct = async (req, res) => {
  const { price, name, category } = req.body;
  // if product properties are empty, send BAD_REQUEST as response
  if (!price || !name || !category) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid request" });
  } else {
    // create product
    try {
      const product = await Product.create({ price, name, category });
      res.status(StatusCodes.CREATED).json({ message: "Product created", product });
    } catch (e) {
        // send BAD_REQUEST error if the category is invalid
      if (e.message === "Product validation failed: category: Invalid Category") {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Category" });
      } else if(e.code === 11000){
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Name already used" });
      } else {
        // send INTERNAL_SERVER_ERROR if an error occurs whiles creating product
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:  "An error occured whiles creating product, kindly try again",});
      }
    }
  }
};

// get getCategoryProducts
const getCategoryProducts = async (req,res) => {
    try{
        // get products per category
        const fullcakes = await Product.find({category:"Full Cakes"});
        const bananacakes = await Product.find({category:"Banana Cakes"});
        const cupcakes = await Product.find({category:"Cupcakes"});
        res.status(StatusCodes.OK).json({products: {
            fullcakes, bananacakes, cupcakes
        }});
    }catch(e){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:  "An error occured whiles fetching products, kindly try again",});
    }

}

module.exports = { createProduct, getCategoryProducts };
