const express = require('express');
const { addToCartValidator, removeFromCartValidator } = require('./dto');
const { addToCartController, getCartProductController, removeFromCartController } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const cartRouter =  express.Router();

cartRouter.get("/",validateLoggedInUserMiddleware,getCartProductController);
cartRouter.post("/add/:productId",validateLoggedInUserMiddleware,addToCartValidator,addToCartController)
cartRouter.post("/remove/:productId",validateLoggedInUserMiddleware,removeFromCartValidator,removeFromCartController)

module.exports={cartRouter}