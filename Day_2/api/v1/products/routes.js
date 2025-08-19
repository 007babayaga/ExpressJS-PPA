const express = require('express');

const productsRouter = express.Router();

productsRouter.get("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Products (GET) is running fine"
    })
})

productsRouter.post("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Products (POST) is running fine"
    })
})
productsRouter.patch("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Products (PTACH) is running fine"
    })
})
productsRouter.delete("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Products (DELETE) is running fine"
    })
})

module.exports={productsRouter}