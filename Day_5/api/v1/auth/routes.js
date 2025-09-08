const express = require('express');
const { userSignUpValidator } = require('./dto');
const { userSignUpController } = require('./controllers');
const { validateOtpMiddleware } = require('../otps/middlewares');


const authRouter = express.Router();

authRouter.post("/signup",userSignUpValidator,validateOtpMiddleware,userSignUpController)

module.exports={authRouter}