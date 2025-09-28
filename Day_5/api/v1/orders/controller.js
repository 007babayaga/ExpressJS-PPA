const { productModel } = require("../../../Models/productSchema");

const placeOrderController = async(req,res)=>{
    try{
        console.log("---------------Inside placeOrderController----------");
        const{products,address} = req.body;
        let allItemsAreInStock = true;

        for(let product of products){
            const{productId,quntity} = product;
            const updatedProduct = await productModel.findByIdAndUpdate(productId,{
                $inc:{quantity:-1*quntity}
            })
            if(updatedProduct && updatedProduct.quantity<0){
                allItemsAreInStock=false;
            }
        }
        if(!allItemsAreInStock){
            for(let product of products){
            const{productId,quntity} = product;
            await productModel.findByIdAndUpdate(productId,{
                    $inc:{quantity:quntity}
                })
            }
            res.status(500).json({
                isSuccess:false,
                message:"Some Items Are Out of Stcok"
            })
            return
        }
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