const { otpModel } = require("../../../Models/otpSchema");
const { sendOtp } = require("../../../utils/emailHelper");

const sendOtpController = async(req,res)=>{
    try{
        console.log("----------inside sendOtpController--")
        const{email} = req.body

        const otp = Math.floor(Math.random()*9000 +1000);
        
        //We send the Otp to email using EmailHelper file(NodeMailer)
            await sendOtp(email,otp);
        
        //we will store it in the Db
        await otpModel.create({
            email,
            otp
        })
        //send a success response
        res.status(201).json({
            isSuccess:true,
            message:"Otp Sent SuccessFully"
        })

    }
    catch(err){
        console.log("Error in sendOtpController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Error in Sendind Otp"
        })
    }
}

module.exports={sendOtpController}