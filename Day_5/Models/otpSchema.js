const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const{Schema,model} = mongoose;

const otpSchema = new Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    otp:{
        type:String,
        trim:true,
        required:true
    },
},{
    versionKey:false,
    timestamps:true
})

//-------------default validations Should always runs when someone comes to  findOneAndUpdate/findByIdAndUpdate
otpSchema.pre("findOneAndUpdate",function(){
    this.options.runValidators=true,
    this.options.new=true
});
otpSchema.pre("updateOne",function(){
    this.options.runValidators=true,
    this.options.new=true
});
otpSchema.pre("updateMany",function(){
    this.options.runValidators=true,
    this.options.new=true
});

otpSchema.pre("save",async function(next){
    if(this.isModified("otp")){
        this.otp = await bcrypt.hash(this.otp.toString(),11)
    }
    next();
})

const otpModel = model("otp",otpSchema);

module.exports={otpModel}