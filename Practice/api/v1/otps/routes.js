const express = require('express');
const { sendOtpController } = require('./controllers');
const { validateEmailForOtp } = require('./dto');

const otpRouter = express.Router();

otpRouter.post("/",validateEmailForOtp,sendOtpController)

module.exports={otpRouter}