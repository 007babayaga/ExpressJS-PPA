const mongoose = require('mongoose');
const validateCreateProduct =(req,res,next)=>{
    const{title,price,quantity,description} = req.body;
    try{
        console.log("-----------inside validateCreateProduct------------ ")
        if(!title || title.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Title length > 3"
            })
            return;
        }
        if(!description || description.length<5){
            res.status(400).json({
                isSuccess:false,
                message:"description is too short..."
            })
            return;
        }
        if(!price || price<1){
            res.status(400).json({
                isSuccess:false,
                message:"Price must be gretaer than 1"
            })
            return;
        }
        if(!quantity || quantity<1){
            res.status(400).json({
                isSuccess:false,
                message:"quantity must be gretaer than 1"
            })
            return;
        }
        next();
    }
    catch(err){
        console.log("Error in validating product",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server side Error"
        })
    }
}

const updateProductValidator =(req,res,next)=>{
    try{
        const{title,price,quantity,description} = req.body;
        const{productId} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            res.status(400).json({
                isSuccess: false,
                message: "Format Error (Id)"
            });
            return;
        }
        console.log("-----------inside updateProductValidator------------ ")
        if(title && title.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Title length > 3"
            })
            return;
        }
        if(description && description.length<5){
            res.status(400).json({
                isSuccess:false,
                message:"description is too short..."
            })
            return;
        }
        if(price && price<1){
            res.status(400).json({
                isSuccess:false,
                message:"Price must be gretaer than 1"
            })
            return;
        }
        if(quantity && quantity<1){
            res.status(400).json({
                isSuccess:false,
                message:"quantity must be gretaer than 1"
            })
            return;
        }
        next();
    }
    catch(err){
        console.log("Error in validating product",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server side Error"
        })
    }
}

const validateDeleteProduct = (req,res,next)=>{
    try{
        console.log("-----------inside validateDeleteProduct------------ ")
        const{productId} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({
            isSuccess: false,
            message: "Invalid Product ID (format)",
        });
        return;
    }
    next();
    }
    catch(err){
        console.log("--------error in validateDeleteProduct--",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in validateDeleteProduct"
        })
    }
}

const validatelistProduct  = (req,res,next)=>{
    try{
        console.log("--------------- Inside validatelistProduct");
        const{limit,page}= req.query;
        if(limit<=0){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid Limit"
            })
            return
        }
        if(page<=0){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid pageNo.."
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in validatelistProduct",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Validation failed  for validatelistProduct"
        })
    }
}


module.exports={validateCreateProduct,updateProductValidator,validateDeleteProduct,validatelistProduct}