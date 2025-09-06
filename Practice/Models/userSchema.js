const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const{Schema,model} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    address:[{
        city:{type:String},
        State:{type:String},
        Pin:{type:Number}
    }]
})

userSchema.pre("save" ,async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password.toString(),11)
    }
})

const userModel = model("user",userSchema);

module.exports={userModel};