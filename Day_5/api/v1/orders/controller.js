const { cartModel } = require("../../../Models/cartSchema");
const { productModel } = require("../../../Models/productSchema");

const placeOrderController = async(req,res)=>{
    try{
        console.log("---------------Inside placeOrderController----------");
        const{address} = req.body;
        const{_id:userId} = req.currentuser;

        const cartItems = await cartModel.find({
            user:userId
        })
        
        let allItemsAreInStock = true;

        for(let product of cartItems){
            const{product:productId,cartQuantity:quantity} = product;
            const updatedProduct = await productModel.findByIdAndUpdate(productId,{
                $inc:{quantity : -1 * quantity}
            })
            if(updatedProduct && updatedProduct.quantity<0){
                allItemsAreInStock=false;
            }
        }
        if(!allItemsAreInStock){
            for(let product of cartItems){
            const{product:productId,cartQuantity:quantity} = product;
            await productModel.findByIdAndUpdate(productId,{
                $inc:{quantity : quantity}
            })
            }
            res.status(400).json({
                isSuccess:false,
                message:" Some Items are Out of Stock !"
            })
            return
        }
        
        await cartModel.deleteMany({
            user:userId
        })

        res.status(201).json({
            isSuccess:true,
            message:"Order placed Successully!!"
        })
    }
    catch(err){
        console.log("Error in placeOrderController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Sever Error in placeOrderController"
        })
    }
}

module.exports={placeOrderController}