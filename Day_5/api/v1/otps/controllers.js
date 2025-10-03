const { otpModel } = require("../../../Models/otpSchema");
const { sendOtp } = require("../../../utils/emailHelper");

const sendOtpController = async(req,res)=>{
    try{
        console.log("----------inside sendOtpController--")
        const{email} = req.body

        const otp = Math.floor(Math.random()*9000 +1000);
        
        //We send the Otp to email using EmailHelper file(NodeMailer)
        await sendOtp(email,otp);

        const otpDeleteTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        //before storing otp I will check for Duplicate Document
        const otpDoc = await otpModel.findOne({email});
        if(otpDoc){
            await otpModel.findOneAndDelete({email})
        }
        
        //we will store it in the Db
        await otpModel.create({
            email,
            otp,
            otpDeleteTime,
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
            message:"Error in Sending Otp"
        })
    }
}


module.exports={sendOtpController}