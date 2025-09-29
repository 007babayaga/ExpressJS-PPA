const express = require('express');
const { senduserInfoConroller, getUserDeatailsController, getUserAllDeatailsController } = require('./controllers');
const { validateLoggedInUserMiddleware } = require('../../middleware');

const userRouter = express.Router();

userRouter.get("/me",validateLoggedInUserMiddleware,senduserInfoConroller); 
userRouter.get("/minDetails",validateLoggedInUserMiddleware,getUserDeatailsController);
userRouter.get("/allDetails",validateLoggedInUserMiddleware,getUserAllDeatailsController);

module.exports={userRouter}


