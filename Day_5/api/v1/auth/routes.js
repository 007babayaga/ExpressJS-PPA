const express = require('express');
const { userSignUpValidator, userLoginValidator, resetPasswordValidator, resetPasswordTokenValidator } = require('./dto');
const { userSignUpController, userLoginController, userLogoutController, resetPasswordController, resetPasswordWithTokenController, validateResetTokenController } = require('./controllers');
const { validateOtpMiddleware } = require('../otps/middlewares');


const authRouter = express.Router();

authRouter.post("/signup",userSignUpValidator,validateOtpMiddleware,userSignUpController)
authRouter.post("/login",userLoginValidator,userLoginController)
authRouter.get("/logout",userLogoutController)
authRouter.post("/resetPassword",resetPasswordValidator,resetPasswordController)
authRouter.get("/resetPassword/validate/:token", validateResetTokenController);
authRouter.post("/resetPassword/:token", resetPasswordTokenValidator, resetPasswordWithTokenController);


module.exports={authRouter}