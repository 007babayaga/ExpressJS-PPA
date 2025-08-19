const express = require('express');

const orderRouter = express.Router();

orderRouter.get("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Orders(GET) is running fine"
    })
})

orderRouter.post("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Orders(POST) is running fine"
    })
})
orderRouter.patch("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Orders(PATCH) is running fine"
    })
})
orderRouter.delete("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Orders(DELETE) is running fine"
    })
})

module.exports={orderRouter}