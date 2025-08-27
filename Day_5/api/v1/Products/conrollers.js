
const { productModel } = require("../../../Models/productSchema");

const createProductController = async(req,res)=>{
    try{
        console.log("-----------inside createProductController------------ ")
        const data = req.body;
        await productModel.create(data);
        res.status(201).json({
            isSuccess:true,
            message:"Product added to Db Successfully",
            ProductAdded:{
                data
            }
        })
    }
    catch(err){
        console.log(err)
        if(err.code==11000 || err.text =="Validation Error"){
            res.status(400).json({
            isSuccess:false,
            message:"Please do not enter Duplicate Title" 
        })
        return
        }
        console.log("Error in creating product",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server side Error" 
        })
    }
}

const getProductsController =async(req,res)=>{
    try{
        const result = await productModel.find();
        res.status(200).json({
            isSuccess:true,
            message:"Products fetched successfully",
            data:{
                result
            }
        })
    }
    catch(err){
        console.log("erorr in getting products");
        res.status(500).json({
            isSuccess:false,
            message:"Server is unable to fetch products"
        })
    }
}

const updateProductController = async(req,res)=>{
    try{
        console.log("-----------inside updateProductController------------ ");
        const data = req.body;
        const{productId} = req.params

        const updatedProduct = await productModel.findByIdAndUpdate(productId,data).lean();

        if(updatedProduct===null){
        res.status(400).json({
            isSuccess:false,
            message:"(Format is corect) but Id is Invalid"
        })
        return
    }

        res.status(200).json({
            isSuccess:true,
            message:"Product Updated Successfully",
            updatedProduct:{
                updatedProduct
            }
        })
    }
    catch(err){
        console.log(err)
        console.log("Error in Updating Product",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server failed to Update Product"
        })
    }
}

const deleteProductController = async(req,res)=>{
    try{
    console.log("-----------inside deleteProductController------------ ");
    const{productId} = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(productId);

    if(deletedProduct===null){
        res.status(400).json({
            isSuccess:false,
            message:"Format is Correct but Id is Invalid"
        })
        return
    }
    res.status(204).json({
        isSuccess:true,
        message:"Product Deleted Successfully",
        deletedProduct:{
            deletedProduct
        }
    })
    }
    catch(err){
        console.log("Error in deleteProductController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server is Unable to delete Product"
        })
    }
}
module.exports={createProductController,getProductsController,updateProductController,deleteProductController}