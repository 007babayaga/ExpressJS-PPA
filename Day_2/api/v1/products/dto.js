const { readProduct } = require("../../../models/productModel");

const validateProductforCreation = (req,res,next)=>{
    try{
        const data = req.body;
        const{ItemName,price,quantity} = data;
    
        if(!ItemName || ItemName.length<5){
            res.status(400).json({
                isSuccess:false,
                message:"Invalid ItemName"
            })
            return;
        }
        if(!price || price<=0){
            res.status(400).json({
                isSuccess:false,
                message:"Invalid Price"
            })
            return;
        }
        if(!quantity || quantity<=0){
            res.status(400).json({
                isSuccess:false,
                message:"Invalid quantity"
            })
            return;
        }
    
        req.body = {ItemName:ItemName.trim(),price,quantity};
        next();
    }
    catch(err){
        console.log("Error in validating Products",err.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


const validateProductforUpdation = async(req,res,next)=>{
    try{
        const{ItemName,price,quantity,id} = req.body;

        if(!ItemName || ItemName.length <5){
            res.status(400).json({
                isSuccess:"false",
                message:"Item name is Inavalid(Must be Graete than 5 char)"
            })
            return;
        }
        if(!price || price <=0){
            res.status(400).json({
                isSuccess:"false",
                message:"Price should be greater than zero"
            })
            return;
        }
        if(!quantity || quantity <=0){
            res.status(400).json({
                isSuccess:"false",
                message:" Quantity should be greater than zero"
            })
            return;
        }
        const pdts = await readProduct();
        const idx = pdts.findIndex((ele)=>{
            return ele.id === String(id);
        })
        if(idx === -1){
            res.status(400).json({
                isSuccess:"false",
                message:"Enter a valid Product Id"
            })
            return;
        }
        req.body = {ItemName:ItemName.trim(),price,quantity,id}
        next();
    }
    catch(err){
        console.log("Error in validateProductforUpdation ")
        res.status(500).json({
            isSuccess:"false",
            message:"Internal server error"
        })
    }
}
const validateProductforDeletion = async(req,res,next)=>{
    const{id} = req.body;

    const data = await readProduct();
    const idx = data.findIndex((ele)=>{
        return ele.id ===id;
    })

    if(idx===-1){
        res.status(400).json({
        isSuccess:false,
        message:"Enter a valid Product id"
        })
        return;
    }
    next();
}
module.exports={validateProductforCreation,validateProductforUpdation,validateProductforDeletion}