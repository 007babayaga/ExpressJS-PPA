const express = require('express');
const { productsRouter } = require('../Products/routes');

const apiRouter = express.Router();

apiRouter.use("/products",productsRouter);

module.exports={apiRouter}



