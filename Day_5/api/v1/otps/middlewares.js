const { otpModel } = require("../../../Models/otpSchema");
const bcrypt = require('bcrypt');

const validateOtpMiddleware = async(req,res,next)=>{
    try{
        console.log("---------Inside validateOtpMiddleware ")
        const{email,otp} = req.body;
        const otpDoc = await otpModel.findOne().where("email").equals(email).sort("-createdAt").lean();
        if(otpDoc==null){
            res.status(400).json({
                isSuccess:false,
                message:"Otp not Found! Please send the Otp to this email First"
            })
            return
        }
        const{otp:hashedOtp} = otpDoc;

        const isCorrect = await bcrypt.compare(otp.toString(),hashedOtp);

        if(!isCorrect){
            res.status(400).json({
                isSuccess:false,
                message:"InCorrect OTP or OTP Expired !"
            })
            // We can also block the user after he has entered wrong otp for lets say 5 times(future use case)
            return
        }
        // OTP is valid - delete it so it can't be reused
        await otpModel.findOneAndDelete({ email });

        next();
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