const express = require('express');
const { addToCartValidator } = require('./dto');
const { addToCartController, getCartProductController } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const cartRouter =  express.Router();

cartRouter.get("/",validateLoggedInUserMiddleware,getCartProductController);
cartRouter.post("/:productId",validateLoggedInUserMiddleware,addToCartValidator,addToCartController)

module.exports={cartRouter}