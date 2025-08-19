const express = require('express');

const paymentRouter = express.Router();

paymentRouter.get("/",(req,res)=>{
    res.status(200).json({
        isSuccess:"true",
        message:"Payment fetched Successfully"
    })
})

paymentRouter.post("/",(req,res)=>{
    res.status(201).json({
        isSuccess:"true",
        message:"Payment Saved Successfully"
    })
})

module.exports={paymentRouter}

