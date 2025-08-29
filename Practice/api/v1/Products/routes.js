const express = require('express');
const { validateCreateProduct } = require('./dto');
const { createProductController, getProductController, listProductController } = require('./controllers');

const productsRouter = express.Router();

productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.get("/all",getProductController)
productsRouter.get("/",listProductController)


module.exports={productsRouter}