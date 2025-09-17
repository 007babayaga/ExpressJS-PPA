const express = require('express');
const { senduserInfoConroller } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const userRouter = express.Router();

userRouter.get("/me",validateLoggedInUserMiddleware,senduserInfoConroller); // 

module.exports={userRouter}


