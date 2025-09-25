const mongoose = require('mongoose');

const{Schema,model} = mongoose;

const CategorySchema = new Schema ({
    slug:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },

},{
    versionKey:false,
    timestamps:true,
})

const CategoryModel = model("category",CategorySchema);

module.exports={CategoryModel};