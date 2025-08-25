const validateCreateProduct =(req,res,next)=>{
    const{title,price,quantity,description} = req.body;
    try{
        console.log("-----------inside validateCreateProduct------------ ")
        if(!title || title.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Title length >3"
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
        if(!quantity || quantity<1){
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

module.exports={validateCreateProduct}