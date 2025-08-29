const express = require('express');
const { contactRouter } = require('./v1/contacts/routes');
const { productsRouter } = require('./v1/Products/routes');

const apiRouter = express.Router();

apiRouter.use("/contacts",contactRouter)
apiRouter.use("/products",productsRouter)

module.exports={apiRouter}