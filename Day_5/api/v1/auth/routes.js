const express = require('express');
const { userSignUpValidator } = require('./dto');
const { userSignUpController } = require('./controllers');

const authRouter = express.Router();

authRouter.post("/signup",userSignUpValidator,userSignUpController)

module.exports={authRouter}