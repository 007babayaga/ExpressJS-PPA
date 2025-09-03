
const validateCreateProduct =(req,res,next)=>{
    try{
        console.log("-----------inside validateCreateProduct------------ ")
        const{title,price,description} = req.body;

        if(!title || title.length<5){
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

const validateUpdateProduct =(req,res,next)=>{
    try{
        console.log("-----------inside validateUpdateProduct------------ ")
        const{title,price,quantity,description} = req.body;
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
        
        if (productId.length>24) {
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


module.exports={validateCreateProduct,validateUpdateProduct,validateDeleteProduct,validatelistProduct}