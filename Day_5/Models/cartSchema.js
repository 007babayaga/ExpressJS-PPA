const mongoose = require('mongoose');
const{ObjectId} = require('mongodb');

const{Schema,model} = mongoose;

const cartSchema = new Schema({
    user:{
        type: ObjectId, 
        ref:"user",
    },
    product:{
        type: ObjectId, 
        ref:"product"
    },
    cartQuantity:{
        type:Number,
        default:1,
        min:1,
    }
},{
    versionKey:false,
    timestamps:true,
})
//-------------default validations Should always runs when someone comes to  findOneAndUpdate/findByIdAndUpdate
cartSchema.pre("findOneAndUpdate",function(){
    this.options.runValidators=true,
    this.options.new=true
});
cartSchema.pre("updateOne",function(){
    this.options.runValidators=true,
    this.options.new=true
});
cartSchema.pre("updateMany",function(){
    this.options.runValidators=true,
    this.options.new=true
});

const cartModel = model("cart",cartSchema)

module.exports = {cartModel}