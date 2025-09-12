const validateEmail = (req,res,next)=>{
    try{
        console.log("----------inside validateEmailforOtp------");
        const{email} = req.body;
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!email || !emailRegex.test(email)){
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