const express = require('express');
const { userSignUpValidator, userLoginValidator } = require('./dto');
const { createUserController, userLoginController } = require('./controllers');
const { otpMiddleware } = require('../otps/middlewares');

const authRouter = express.Router();

authRouter.post("/signUp",userSignUpValidator,otpMiddleware,createUserController)
authRouter.post("/login",userLoginValidator,userLoginController)

module.exports={authRouter}