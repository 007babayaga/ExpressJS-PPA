const express = require('express');
const { createProductController, getProductsController, updateProductController, deleteProductController, listProductController } = require('./conrollers');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct, validatelistProduct } = require('./dto');

const productsRouter = express.Router();

productsRouter.get("/",validatelistProduct,listProductController);
productsRouter.get("/all",getProductsController);
productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.patch("/:productId",validateUpdateProduct,updateProductController)
productsRouter.delete("/:productId",validateDeleteProduct,deleteProductController)


module.exports={productsRouter}