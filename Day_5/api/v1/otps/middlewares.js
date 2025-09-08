const validateOtpMiddleware = (req,res,next)=>{
    try{
        console.log("---------Inside validateOtpMiddleware ")

    }
    catch(err){
        console.log("Error in validateOtpMiddleware:",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Erorr in  validating OTP"
        })
    }
}
module.exports={validateOtpMiddleware}