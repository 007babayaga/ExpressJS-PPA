const express = require('express');
const { createProductController, getAllProductsController } = require('./conrollers');
const { validateCreateProduct } = require('./dto');

const productsRouter = express.Router();

productsRouter.post("/",validateCreateProduct,createProductController)
productsRouter.get("/",getAllProductsController);

module.exports={productsRouter}