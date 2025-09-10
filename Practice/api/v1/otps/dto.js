const validateEmailForOtp = (req,res,next)=>{
    try{
        console.log("------------inside validateEmailForOtp------")
        const{email} = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!email || !emailRegex.test(email)){
            res.status(400).json({
                isSuccess:false,
                message:"Inavalid Email format"
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in validateEmailForOtp",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in Email Validation"
        })
    }
}

module.exports={validateEmailForOtp}