const mongoose = require('mongoose');

const{Schema,model}= mongoose;

const contactsSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:3,
    },
    phoneNumber:{
        type:Number,
        required:true,
        min:10,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/]
    }
},{
    versionKey:false,
    timestamps:true
})
contactsSchema.pre("findOneAndUpdate",function(){
    this.options.runValidators=true,
    this.options.new=true
})
const contactsModel = model("users",contactsSchema);

module.exports={contactsModel}