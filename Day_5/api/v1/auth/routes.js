const express = require('express');
const { userSignUpValidator, userLoginValidator } = require('./dto');
const { userSignUpController, userLoginController, userLogoutController } = require('./controllers');
const { validateOtpMiddleware } = require('../otps/middlewares');


const authRouter = express.Router();

authRouter.post("/signup",userSignUpValidator,validateOtpMiddleware,userSignUpController)
authRouter.post("/login",userLoginValidator,userLoginController)
authRouter.get("/logout",userLogoutController)


module.exports={authRouter}