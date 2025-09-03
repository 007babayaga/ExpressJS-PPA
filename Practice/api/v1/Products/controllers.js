const { ProductModel } = require("../../../Models/ProductSchema");

const createProductController = async(req,res)=>{
    try{
        console.log("--------------inside createProductController")
        const data = req.body;
        const item = await ProductModel.create(data);
        res.status(201).json({
            isSuccess:true,
            message:"Item Added SuccessFully",
            ItemAdded:{
                item
            }
        })
    }
    catch(err){
        console.log("Error in createProductController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in createProductController"
        })
    }
}

const getProductController = async(req,res)=>{
    try{
        console.log("--------------inside getProductController")
        const item = await ProductModel.find();
        res.status(201).json({
            isSuccess:true,
            message:"All Items fetched SuccessFully",
            ItemAdded:{
                item
            }
        })
    }
    catch(err){
        console.log("Error in getProductController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in getProductController"
        })
    }
}

const listProductController = async(req,res)=>{
    try{
        console.log("--------------inside listProductController")
        const{page,limit,q=""} = req.query;
        const serachRegex = new RegExp(q,"ig");

        const pageNum = parseInt(page)|| 1;
        const limitNum = parseInt(limit)|| 5;
        const skip = (pageNum-1) * limitNum;

        const query = ProductModel.find();
        query.or([
            {"title":serachRegex},
            {"description":serachRegex}
        ])
        
        const total =  await query.clone().countDocuments();
        query.skip(skip);
        query.limit(limitNum);

        const product = await query;
        res.status(200).json({
            isSuccess:true,
            message:"Items fetched Successfully",
            product:product,
            Total:total,
            skipItems:skip,
            limitItem:limitNum
        })

    }
    catch(err){
        console.log("Error in listProductController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in listProductController"
        })
    }
}



module.exports={createProductController,getProductController,listProductController}