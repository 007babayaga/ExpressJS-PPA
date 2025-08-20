const { readProduct } = require("../../../models/ordersModel");

const validationForCreatingOrder = (req,res,next)=>{
    const{ItemName,price,quantity} = req.body;

    if(!ItemName || ItemName.lenght <5){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid product Id"
        })
        return;
    }
    if(!price || price <=0){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid price"
        })
        return;
    }
    if(!quantity || quantity <=0){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid quantity"
        })
        return;
    }
    next();
    req.body={ItemName:ItemName.trim(),price,quantity}
}
const validationForUpdatingOrder= async(req,res,next)=>{
    const{ItemName,price,quantity,id} = req.body;

        if(!ItemName || ItemName.length <5){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid product Id"
        })
        return;
    }
    if(!price || price <=0){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid price"
        })
        return;
    }
    if(!quantity || quantity <=0){
        res.status(400).json({
            isSuccess:false,
            message :"Enter a valid quantity"
        })
        return;
    }
    const allItems = await readProduct();
    const idx = allItems.findIndex((ele)=>{
        return  ele.id ===(id); 
    })

    if(idx===-1){
        res.status(400).json({
            isSuccess:false,
            message:"Please enter a valid Product Id"
        })
        return;
    }
    req.body = {ItemName:ItemName.trim(),price,quantity,id};
    next();
}
module.exports={validationForCreatingOrder,validationForUpdatingOrder}