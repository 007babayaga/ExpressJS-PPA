const express = require('express');
const { userSignUpValidator } = require('./dto');
const { createUserController } = require('./controllers');
const { otpMiddleware } = require('../otps/middlewares');

const authRouter = express.Router();

authRouter.post("/signUp",userSignUpValidator,otpMiddleware,createUserController)

module.exports={authRouter}