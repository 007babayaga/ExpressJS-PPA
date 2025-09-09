const express = require('express');
const { sendOtpController } = require('./controllers');
const { validateEmail } = require('./dto');

const otpRouter = express.Router();

otpRouter.post("/",validateEmail,sendOtpController)

module.exports={otpRouter}