const mongoose = require('mongoose');

const{Schema,model} = mongoose;

const ProductSchema = new Schema({
    title:{
        type:String,
        required:true,
        min:3,
        unique:true,
    },
    price:{
        type:Number,
        min:1,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    description:{
        type:String,
        required:true,
    }
},{
    versionKey:false,
    timestamps:true,
})


const ProductModel = model("product",ProductSchema);

module.exports={ProductModel}