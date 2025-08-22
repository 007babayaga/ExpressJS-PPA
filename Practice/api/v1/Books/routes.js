const express = require('express');
const { validateAddBooks } = require('./dto');
const { createBookController, getBookController } = require('./controller');

const booksRouter = express.Router();

booksRouter.post("/",validateAddBooks,createBookController);
booksRouter.get("/",getBookController);

module.exports={booksRouter}