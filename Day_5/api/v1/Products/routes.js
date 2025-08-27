const express = require('express');
const { createProductController, getAllProductsController, getProductsController, updateProductController, deleteProductController } = require('./conrollers');
const { validateCreateProduct, updateProductValidator, validateDeleteProduct } = require('./dto');

const productsRouter = express.Router();

productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.get("/",getProductsController);
productsRouter.patch("/:productId",updateProductValidator,updateProductController)
productsRouter.delete("/:productId",validateDeleteProduct,deleteProductController)

module.exports={productsRouter}