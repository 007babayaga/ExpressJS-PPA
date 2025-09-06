const express = require('express');
const { productsRouter } = require('../Products/routes');
const { authRouter } = require('../auth/routes');

const apiRouter = express.Router();

apiRouter.use("/products",productsRouter);
apiRouter.use("/auth",authRouter);

module.exports={apiRouter}



