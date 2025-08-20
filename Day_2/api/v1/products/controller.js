const { saveproduct, readProduct } = require("../../../models/productModel");
const { mySaveFile } = require("../../../utils/Filehelper");

const createProductController = async(req,res)=>{
    try{
        const data = req.body;
        await saveproduct(data)
        res.status(201).json({
            isSuccess:"true",
            message:"Product Created Successfully"
        })
    }
    catch(err){
        console.log("Error in creating product",err.message);
        res.status(400).json({
            isSuccess:"false",
            message:err.message
        })
    }
}

const getProductController = async(req,res)=>{
    const data = await readProduct();
    res.status(200).json({
        isSuccess:"true",
        message:"Products Fetched successfully",
        data:data
    })
}

const updateProductController = async(req,res)=>{
    try{
        const data = req.body;
        const{id} = data;
        
        const allItems = await readProduct();
        const idx = allItems.findIndex((ele)=>{
            return ele.id === id;
        })

        const oldObj = allItems[idx];
        allItems[idx] = {...oldObj,...data}

        await mySaveFile("./models/products.json",allItems);
        res.status(200).json({
            isSuccess:true,
            message:"Items updated Successfully"
        })
    }
    catch(err){
        console.log("Error in updateProductController ",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal Server Error"
        })
    }
}

const deleteProductController = async(req,res)=>{
    const{id} = req.body;

    const data = await readProduct();
    const idx = data.findIndex((ele)=>{
        return ele.id ===id;
    })

    data.splice(idx,1);
    await mySaveFile("./models/products.json",data)
    res.status(204).json({
        isSuccess:true,
        message:"Item deleted succesfully"
    })
}
module.exports={createProductController,getProductController,updateProductController,deleteProductController}