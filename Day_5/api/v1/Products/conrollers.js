const { productModel } = require("../../../Models/productSchema");

const createProductController = async(req,res)=>{
    try{
        console.log("-----------inside createProductController------------ ")
        const data = req.body;
        await productModel.create(data);
        res.status(201).json({
            isSuccess:true,
            message:"Product added to Db Successfully",
            ProductAdded:data
        })
    }
    catch(err){
        console.log(err)
        if(err.code==11000){
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

const getAllProductsController =async(req,res)=>{
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

module.exports={createProductController,getAllProductsController}