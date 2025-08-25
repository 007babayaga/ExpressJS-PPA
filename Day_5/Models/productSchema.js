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
    qunatity:{
        type:Number,
        default:1,
    },
    description:String,
},{
    versionKey:false,
    timestamps:true,
})

const productModel = model("product",productSchema)

module.exports = {productModel}