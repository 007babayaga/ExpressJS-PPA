const express = require('express');
const { productsRouter } = require('./v1/Products/routes');
const { authRouter } = require('./v1/auth/routes');
const { otpRouter } = require('./v1/otps/routes');
const { userRouter } = require('./v1/Users/routes');
const { cartRouter } = require('./v1/cart/routes');
const { orderRouter } = require('./v1/orders/routes');


const apiRouter = express.Router();

apiRouter.use("/products",productsRouter);
apiRouter.use("/auth",authRouter);
apiRouter.use("/otps",otpRouter);
apiRouter.use("/users",userRouter);
apiRouter.use("/cart",cartRouter);
apiRouter.use("/orders",orderRouter);

module.exports={apiRouter}


