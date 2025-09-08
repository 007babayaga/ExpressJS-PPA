const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const{Schema,model} = mongoose;

const otpSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
        trim:true,
    }
})

otpSchema.pre("save" ,async function (next) {
    if(this.isModified("otp")){
        this.otp = await bcrypt.hash(this.otp.toString(),11)
    }
})

const otpModel = model("otp",otpSchema);

module.exports={otpModel};