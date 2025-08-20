const { readProduct } = require("../../../models/ordersModel");
const { saveproduct } = require("../../../models/ordersModel");
const { mySaveFile } = require("../../../utils/Filehelper");

const createOrderController = async(req,res) =>{
    try{
        const data = req.body;
        await saveproduct(data);
        res.status(201).json({
            isSuccess:true,
            message:"Order added to cart Successfully"
        })
    }
    catch(err){
        console.log("Error in creating order",err.message)
        res.status(400).json({
            isSuccess:false,
            message:"Please add a different Item"
        })
    }
}
const getOrdersController = async(req,res)=>{
    const data = await readProduct();
    res.status(200).json({
        isSuccess:true,
        message:"orders Fetched successfully",
        data:data
    })
}
const updateOrderController = async(req,res)=>{
    try{
        const data = req.body;
        const{id} = data;
        const allOrders = await readProduct();
    
        const idx = allOrders.findIndex((ele)=>{
            return ele.id === id;
        })
        const oldObj = allOrders[idx];
        allOrders[idx] = {...oldObj,...data}
        await mySaveFile("./models/orders.json",allOrders);
        res.status(200).json({
            isSuccess:true,
            message:"orders Updated successfully"
        })
    }
    catch(err){
        console.log("Error in updating Orders");
        res.status(500).json({
            isSuccess:false,
            message:"Error from the server side"
        })
    }
}

module.exports={createOrderController,getOrdersController,updateOrderController}