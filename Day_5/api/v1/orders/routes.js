const express = require('express');
const { placeOrderValidator } = require('./dto');
const { placeOrderController } = require('./controller');

const orderRouter = express.Router();

orderRouter.post("/",placeOrderController)

module.exports={orderRouter};