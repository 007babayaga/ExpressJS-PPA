const express = require('express');
const { addToCartValidator, removeFromCartValidator, deleteFromCartValidator } = require('./dto');
const { addToCartController, getCartProductController, removeFromCartController, deleteFromCartController } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const cartRouter =  express.Router();

cartRouter.get("/",validateLoggedInUserMiddleware,getCartProductController);
cartRouter.post("/add/:productId",validateLoggedInUserMiddleware,addToCartValidator,addToCartController)
cartRouter.post("/remove/:productId",validateLoggedInUserMiddleware,removeFromCartValidator,removeFromCartController)
cartRouter.post("/delete/:CartItemId",validateLoggedInUserMiddleware,deleteFromCartValidator,deleteFromCartController)

module.exports={cartRouter}