const placeOrderValidator = (req,res,next)=>{
    try{
        console.log("---------------Inisde placeOrderValidator-------------")
        const{address} = req.body;

        if(!address || address===undefined){
            res.status(400).json({
                isSuccess:false,
                message:"Enter the Address First"
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in placeOrderValidator",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Server Error while Validating Placing Order"
        })
    }
}

module.exports={placeOrderValidator}