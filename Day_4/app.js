require('dotenv').config()
const express = require('express');
const { ProductModel } = require('./Models/ProductSchema');
require("./config/db")

const app = express();
app.use(express.json());

app.post("/",async(req,res)=>{
    try{
        const data = req.body;
        await ProductModel.create(data);
        res.status(201).json({
            isSuccess:true,
            message:"Product created Successfully"
        })
    }
    catch(err){
        if(err.name=="ValidationError"|| err.code == 11000){
            res.status(400).json({
                isSuccess:false,
                message:`${err.message}`
            })
        }
        else{
            res.status(500).json({
                isSuccess:false,
                message:`Server Error ${err.message}`
            })
        }
    }
})

app.listen(3900,()=>{
    console.log("-----------server started🚀-----------------")
})


