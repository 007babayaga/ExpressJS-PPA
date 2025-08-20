const express = require('express');
const { validationForCreatingOrder, validationForUpdatingOrder } = require('./dto');
const { createOrderController, getOrdersController, updateOrderController } = require('./controller');

const orderRouter = express.Router();

orderRouter.get("/",getOrdersController)

orderRouter.post("/",validationForCreatingOrder,createOrderController)

orderRouter.patch("/",validationForUpdatingOrder,updateOrderController)


orderRouter.delete("/",(req,res)=>{
    res.status(200).json({
        isSucess:"true",
        message:"Orders(DELETE) is running fine"
    })
})

module.exports={orderRouter}