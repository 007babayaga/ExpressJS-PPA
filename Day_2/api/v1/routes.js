const express = require('express');
const { orderRouter } = require('./orders/routes');
const { productsRouter } = require('./products/routes');

const apiRouter = express.Router();

apiRouter.use("/orders",orderRouter) // Route Level Middleware
apiRouter.use("/products",productsRouter)  // Route Level Middleware

module.exports={apiRouter}