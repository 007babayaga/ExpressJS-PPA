const express = require('express');
const { createProductController, getAllProductsController, getProductsController, updateProductController, deleteProductController, listProductController } = require('./conrollers');
const { validateCreateProduct, updateProductValidator, validateDeleteProduct, validatelistProduct } = require('./dto');

const productsRouter = express.Router();

productsRouter.get("/",validatelistProduct,listProductController);
productsRouter.get("/all",getProductsController);
productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.patch("/:productId",updateProductValidator,updateProductController)
productsRouter.delete("/:productId",validateDeleteProduct,deleteProductController)

module.exports={productsRouter}