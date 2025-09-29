const express = require('express');
const { placeOrderValidator } = require('./dto');
const { placeOrderController } = require('./controller');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const orderRouter = express.Router();

orderRouter.post("/",validateLoggedInUserMiddleware,placeOrderValidator,placeOrderController)

module.exports={orderRouter};