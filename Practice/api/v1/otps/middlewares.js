const { otpModel } = require("../../../Models/otpSchema");
const bcrypt = require('bcrypt');

const otpMiddleware = async(req,res,next)=>{
    try{
        const{email,otp}= req.body;

        console.log("----------Inside otpMiddleware-")
        const otpdocs = await otpModel.findOne().where("email").equals(email).sort("-createdAt").lean();
        
        if(otpdocs==null){
            res.status(400).json({
                isSuccess:false,
                message:"Please Send Otp to this email first"
            })
            return
        }
        const{otp:hashedotp} = otpdocs;
        const isCorrect = await bcrypt.compare(otp.toString(),hashedotp);
        if(!isCorrect){
            res.status(400).json({
                isSuccess:false,
                message:"Invalid Otp"
            })
            return
        }
        next();
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