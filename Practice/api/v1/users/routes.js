const express = require('express');
const { userLoggedInMiddleware } = require('../../userMiddleware');
const { sendUserInfoController } = require('./controllers');

const userRouter = express.Router();

userRouter.get("/me",userLoggedInMiddleware,sendUserInfoController)

module.exports={userRouter}