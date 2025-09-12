const { otpModel } = require("../../../Models/otpSchema");
const { sendOtp } = require("../../../utils/emailHelper");

    const sendOtpController = async(req,res)=>{
    try{
        console.log("---------Inside sendOtpController-")
        const{email}= req.body;
        //generate Otp
        const otp  = Math.floor(Math.random()*9000+1000);
        //send the Otp To email using Nodemailer
        await sendOtp(email,otp);
        //save It into Database
        await otpModel.create({
            email,
            otp
        })
        res.status(201).json({ 
            isSuccess:true,
            message:"Otp Sent SuccessFully"
        })
    }
    catch(err){
        console.log("error in sendOtpController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"error in sendOtpController"
        })
    }
}

module.exports={sendOtpController}
