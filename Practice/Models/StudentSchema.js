const mongoose = require('mongoose');

const{Schema,model} = mongoose;

const StudentSchema = new Schema ({
    name:{
        type:String,
        min:4,
        required:true,
    },
    phoneNumber:{
        type:Number,
        unique:true,
        required:true,
        min:10,
    },
    email:{
        type:String,
        required:true,
    }
},{
    versionKey: false,
    timestamps:true
});

const StudentModel = model("Students",StudentSchema)

module.exports={StudentModel};