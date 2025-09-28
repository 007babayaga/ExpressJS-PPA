const mongoose = require("mongoose");

const addToCartValidator = (req,res,next)=>{
    try{
        console.log("---------------inside addToCartValidator---------")
        const{productId} = req.params;

        if(!productId){
            res.status(400).json({
                isSuccess:false,
                message:"Please enter productId and userId"
            })
            return;
        }
        if (!mongoose.isValidObjectId(productId) ) {
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Ids"
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in addToCartValidator",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server Error in addToCartValidator"
        })
    }
}
const removeFromCartValidator = (req,res,next)=>{
    try{
        console.log("---------------inside removeFromCartValidator---------")
        const{productId} = req.params;

        if(!productId){
            res.status(400).json({
                isSuccess:false,
                message:"Please enter productId and userId"
            })
            return;
        }
        // if (!mongoose.isValidObjectId(productId) ) {
        //     res.status(400).json({
        //         isSuccess:false,
        //         message:"Enter valid Ids"
        //     })
        //     return
        // }
        next();
    }
    catch(err){
        console.log("Error in removeFromCartValidator",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server Error in removeFromCartValidator"
        })
    }
}

module.exports={addToCartValidator,removeFromCartValidator}