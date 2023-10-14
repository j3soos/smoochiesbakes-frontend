const {StatusCodes} = require ('http-status-codes')
const Product = require('../models/product')

const createProduct = async (req,res) => {
    const { price, name, category } = req.body;
    // if product properties are empty, send BAD_REQUEST as response
    if (!price||!name||!category){
        res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid request"})
    } else {
        // create product
        try{
            const product = await Product.create({price,name,category})
            res.status(StatusCodes.CREATED).json({message:"Product created", product})
        } catch(e){
            // send INTERNAL_SERVER_ERROR if an error occurs whiles creating product
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"An error occured whiles creating product, kindly try again"})
        }
    }
}

module.exports = {createProduct}