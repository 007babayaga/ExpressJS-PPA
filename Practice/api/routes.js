const express = require('express');
const { ordersRouter } = require('./orders/routes');
const { paymentRouter } = require('./payment/routes');

const apiRouter = express.Router();

apiRouter.use("/orders",ordersRouter);  //request comes here and check /api/orders the request goes to ordersRouter
apiRouter.use("/payments",paymentRouter) //request comes here and check /api/payments the request goes to paymentRouter

module.exports={apiRouter}