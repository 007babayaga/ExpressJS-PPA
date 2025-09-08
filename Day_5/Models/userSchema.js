const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const{Schema,model} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    address:[{
        state:String,
        city:String,
        locality:String,
        postslCode:String,
    }],
    profilePhoto:{
        type:String
    },
    isProfileComplete:{
        type:Boolean,
        default:false
    }
},{
    versionKey:false,
    timestamps:true
})

//-------------default validations Should always runs when someone comes to  findOneAndUpdate/findByIdAndUpdate
userSchema.pre("findOneAndUpdate",function(){
    this.options.runValidators=true,
    this.options.new=true
});
userSchema.pre("updateOne",function(){
    this.options.runValidators=true,
    this.options.new=true
});
userSchema.pre("updateMany",function(){
    this.options.runValidators=true,
    this.options.new=true
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password.toString(),11)
    }
    next();
})

const userModel = model("user",userSchema);

module.exports={userModel}