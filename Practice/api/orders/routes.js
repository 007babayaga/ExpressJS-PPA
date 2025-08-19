const express = require('express');

const ordersRouter = express.Router();

ordersRouter.get('/',(req,res)=>{
    res.status(201).json({
        isSucess:"true",
        message:"order created in the Backend Successfuully"
    })
})
module.exports={ordersRouter}