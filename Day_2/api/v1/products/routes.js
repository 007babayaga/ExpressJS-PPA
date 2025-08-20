const express = require('express');
const { createProductController, getProductController, updateProductController, deleteProductController } = require('./controller');
const { validateProductforCreation, validateProductforUpdation, validateProductforDeletion } = require('./dto');

const productsRouter = express.Router();


//---------Instead of this we will now have separate controller to write our Business Logic
// productsRouter.get("/",(req,res)=>{
//     res.status(200).json({
//         isSucess:"true",
//         message:"Products (GET) is running fine"
//     })
// })
productsRouter.get("/",getProductController)

//---------Instead of this we will now have separate controller to write our Business Logic
// productsRouter.post("/",(req,res)=>{
//     res.status(200).json({
//         isSucess:"true",
//         message:"Products (POST) is running fine"
//     })
// })

productsRouter.post("/",validateProductforCreation,createProductController)

productsRouter.patch("/",validateProductforUpdation,updateProductController)

productsRouter.delete("/",validateProductforDeletion,deleteProductController)

module.exports={productsRouter}