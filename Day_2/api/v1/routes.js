const express = require('express');
const { orderRouter } = require('./orders/routes');
const { productsRouter } = require('./products/routes');

const apiRouter = express.Router();

apiRouter.use("/orders",orderRouter)
apiRouter.use("/products",productsRouter)

module.exports={apiRouter}