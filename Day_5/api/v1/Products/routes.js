const express = require('express');
const { createProductController, getProductsController, updateProductController, deleteProductController, listProductController } = require('./conrollers');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct, validatelistProduct } = require('./dto');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const productsRouter = express.Router();
// this is a router level middleware any request comes will go through this middleware(it is also a global Middleware) 
productsRouter.use(validateLoggedInUserMiddleware);

productsRouter.get("/",validatelistProduct,listProductController);
productsRouter.get("/all",getProductsController);
productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.patch("/:productId",validateUpdateProduct,updateProductController)
productsRouter.delete("/:productId",validateDeleteProduct,deleteProductController)


module.exports={productsRouter}