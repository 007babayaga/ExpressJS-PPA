const express = require('express');
const { booksRouter } = require('./v1/Books/routes');
const { booksUpdationRouter } = require('./v1/BooksUpdation/routes');

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/books",booksRouter)
apiRouter.use("/books/:bookId",booksUpdationRouter);

module.exports={apiRouter}