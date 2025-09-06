const express = require('express');
const { userSignUpValidator } = require('./dto');
const { createUserController } = require('./controllers');

const authRouter = express.Router();

authRouter.post("/signUp",userSignUpValidator,createUserController)

module.exports={authRouter}