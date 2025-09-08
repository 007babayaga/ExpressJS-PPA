const express = require('express');
const { productsRouter } = require('../Products/routes');
const { authRouter } = require('../auth/routes');
const { otpRouter } = require('../otps/routes');

const apiRouter = express.Router();

apiRouter.use("/products",productsRouter);
apiRouter.use("/auth",authRouter);
apiRouter.use("/otps",otpRouter);

module.exports={apiRouter}



