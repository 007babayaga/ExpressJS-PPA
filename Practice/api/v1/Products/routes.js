const express = require('express');
const { validateCreateProduct, validateListProduct } = require('./dto');
const { createProductController, getProductController, listProductController } = require('./controllers');

const productsRouter = express.Router();

productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.get("/all",getProductController)
productsRouter.get("/",validateListProduct,listProductController)


module.exports={productsRouter}