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

        const{limit,page,select="title price quantity",q=""} = req.query

        const selectedItems = select.replaceAll(","," ");
        const limitNum = parseInt(limit) || 4;
        const pageNum = parseInt(page) || 1;

        const regEx = new RegExp(q,"ig");

        const skip = (pageNum-1)*limit;

        const query =  ProductModel.find();
        query.select(selectedItems)
        query.or([
            {title:regEx},
            {description:regEx}
        ])
        const AllItems = await query.clone().countDocuments();
        
        query.skip(skip)
        query.limit(limitNum);

        const totalItems = await query
        res.status(200).json({
            isSuccess:true,
            message:"Fetched SuccessFully",
            Items:{
                totalItems,
                total:AllItems,
                skip,
                limit:Math.min(limitNum,totalItems.length)
            }
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