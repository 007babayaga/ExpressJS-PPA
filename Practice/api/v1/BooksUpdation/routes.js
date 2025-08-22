const express = require('express');
const { validateUpdation } = require('./dto');
const { updateConroller } = require('./controller');

const booksUpdationRouter = express.Router();

booksUpdationRouter.patch("/",validateUpdation,updateConroller)

module.exports={booksUpdationRouter}