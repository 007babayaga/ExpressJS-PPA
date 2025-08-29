const mongoose = require('mongoose');

const{Schema,model} = mongoose;

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        min:3,
        unique:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:1
    },
    quantity:{
        type:Number,
        default:1,
    },
    description:String,
},{
    versionKey:false,
    timestamps:true,
})
//-------------default validations Should always runs when someone comes to  findOneAndUpdate/findByIdAndUpdate
productSchema.pre("findOneAndUpdate",function(){
    this.options.runValidators=true,
    this.options.new=true
});
productSchema.pre("updateOne",function(){
    this.options.runValidators=true,
    this.options.new=true
});
productSchema.pre("updateMany",function(){
    this.options.runValidators=true,
    this.options.new=true
});

const productModel = model("product",productSchema)

module.exports = {productModel}