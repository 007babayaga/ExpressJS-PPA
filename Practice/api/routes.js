const express = require('express');
const { contactRouter } = require('./v1/contacts/routes');

const apiRouter = express.Router();

apiRouter.use("/contacts",contactRouter)

module.exports={apiRouter}