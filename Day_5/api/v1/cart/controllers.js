const { cartModel } = require("../../../Models/cartSchema");

const addToCartController = async(req,res)=>{
    try{
        console.log("---------------Inside addToCartController-------")
        const {productId} = req.params;
        const{_id} = req.currentuser;
        
        const cartItem = await cartModel.findOne({
            user :_id,
            product:productId,
        })

        if(cartItem){
            await cartModel.findOneAndUpdate(cartItem._id,{
                $inc:{cartQuantity:1}
            })
        }
        else{
            // Add item 
            await cartModel.create({
            user :_id,
            product:productId,
            });
        }
        res.status(201).json({
            isSuccess:true,
            message:"Item added to cart SuccessFully"
        })

    }
    catch(err){
        console.log("Error in addToCartController",err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Server error in Adding Product"
        })
    }
}
const getCartProductController = async(req,res)=>{
    try{
        console.log("---------------Inside getCartProductController-------")
        const{_id} = req.currentuser;

        const Allitems = await cartModel.find({
            user:_id,
        })
        .populate("product")
        .lean();

        res.status(201).json({
            isSuccess:true,
            message:"Item added to cart SuccessFully",
            items:{
                data:Allitems
            }
        })

    }
    catch(err){
        console.log("Error in getCartProductController",err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Server error in getting Product"
        })
    }
}
module.exports={addToCartController,getCartProductController}