const validateCreateProduct = (req,res,next)=>{
    try{
        console.log("--------------inside validateCreateProduct")
        const{title,price,quantity,description} = req.body

        if(!title || title.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid Title"
            })
            return
        }
        if(!price || price<1){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid price"
            })
            return
        }
        if(!quantity || quantity<1){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid quantity"
            })
            return
        }
        if(!description || description.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a valid description"
            })
            return
        }
        next();
        
    }
    catch(err){
        console.log("Error in validateCreateProduct",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in validateCreateProduct"
        })
    }
}

module.exports={validateCreateProduct}