const validateEmail = (req,res,next)=>{
    try{
        console.log("----------inside validateEmailforOtp------");
        const{email} = req.body;
        
        if(!email){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Email "
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in validating email ",err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Error in Validating Email for Otp sending"
        })
    }
}



module.exports={validateEmail}