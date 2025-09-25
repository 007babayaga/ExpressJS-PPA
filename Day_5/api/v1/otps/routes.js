const express = require('express');
const { sendOtpController, verifyOtpController } = require('./controllers');
const { validateEmail} = require('./dto');
const { validateOtpMiddleware } = require('./middlewares');

const otpRouter = express.Router();

otpRouter.post("/",validateEmail,sendOtpController)


module.exports={otpRouter}