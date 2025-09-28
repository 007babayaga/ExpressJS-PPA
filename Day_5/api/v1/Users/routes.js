const express = require('express');
const { senduserInfoConroller, getUserInfoController } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const userRouter = express.Router();

userRouter.get("/me",validateLoggedInUserMiddleware,senduserInfoConroller); 
userRouter.get("/details",validateLoggedInUserMiddleware,getUserInfoController);

module.exports={userRouter}


