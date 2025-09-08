const otpMiddleware = (req,res,next)=>{
    try{
        console.log("Inside otpMiddleware-")

    }
    catch(err){
        console.log("error in otpMiddleware",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"error in otpMiddleware"
        })
    }
}

module.exports={otpMiddleware}