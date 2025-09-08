const { otpModel } = require("../../../Models/otpSchema");

    const sendOtpController = async(req,res)=>{
    try{
        console.log("Inside sendOtpController-")
        const{email}= req.body;

        const otp  = Math.floor(Math.random()*9000+1000);
        await otpModel.create({
            email,
            otp
        })
        res.status(201).json({
            isSuccess:true,
            message:"user created Successfully"
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
