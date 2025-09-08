const express = require('express');
const { contactRouter } = require('./v1/contacts/routes');
const { productsRouter } = require('./v1/Products/routes');
const { authRouter } = require('./v1/Auth/routes');
const { otpRouter } = require('./v1/otps/routes');

const apiRouter = express.Router();

apiRouter.use("/contacts",contactRouter)
apiRouter.use("/products",productsRouter)
apiRouter.use("/auth",authRouter)
apiRouter.use("/otps",otpRouter)

module.exports={apiRouter}