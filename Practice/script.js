// const express = require('express');
// // const { readFile, saveFile } = require('./utils/Helper');
// // const { v4: uuidv4 } = require('uuid');

// const app = express();
// const morgan = require('morgan');
// const { apiRouter } = require('./api/routes');

// app.use(morgan('dev'))

// app.use("/api",apiRouter)  //whenever the request comes with /api this middleware sends the request to api router
// // app.use(express.json());

// // app.use((req,res,next)=>{
// //     console.log("Inside first middleware")
// //     console.log(req.method,req.url);
// //     next();
// // })
// // app.use((req,res,next)=>{
// //     console.log("Inside second middleware")
// //     next()
// // })

// // //Crud ops

// // //post api to save the products
// // app.post("/api/v1/products",async(req,res)=>{
// //     const data = req.body;
// //     data.id = uuidv4();
// //     const oldData =  await readFile("./data.json")
// //     oldData.push(data);
// //     await saveFile("./data.json",oldData);
// //     res.status(201).json({
// //         isSuccess:"true",
// //         message:"product added successfully"
// //     })
// // })

// // //get api to get the products
// // app.get('/api/v1/products',async(req,res)=>{
// //     const data = await readFile("./data.json")
// //     res.status(200).json({
// //         isSuccess:"true",
// //         message:"items fetched sucessfully",
// //         data:data
// //     })
// // })

// // //patch api to upadate the products
// // app.patch("/api/v1/products/:productId",async(req,res)=>{
// //     const{productId} = req.params;
// //     const data = req.body;

// //     const allPdt = await readFile("./data.json");
// //     const idx = allPdt.findIndex((ele)=>{
// //         return ele.id ===productId;
// //     })
// //     if(idx===-1){
// //         res.status(400).json({
// //             isSucess:"false",
// //             message:"wrong Product id by user"
// //         })
// //         return;
// //     }
// //     const oldObj = allPdt[idx];
// //     allPdt[idx] ={...oldObj,...data}
// //     await saveFile("./data.json",allPdt)
// //     res.status(200).json({
// //         isSuccess:"true",
// //         message:"item updated sucessfully"
// //     })
// // })

// // //delete api to delete a product

// // app.delete("/api/v1/products/:productId",async(req,res)=>{
// //     const{productId} = req.params;
// //     const alldata = await readFile("./data.json");
// //      const idx = alldata.findIndex((ele)=>{
// //         return ele.id ===productId;
// //     })
// //     if(idx===-1){
// //         res.status(400).json({
// //             isSucess:"false",
// //             message:"wrong Product id by user"
// //         })
// //         return;
// //     }
// //     alldata.splice(idx,1);
// //     await saveFile("./data.json",alldata)
// //     res.status(204).json({
// //         isSuccess:"true",
// //         message:"item deleted sucessfully"
// //     })
    
// // })

// app.listen(4000,()=>{
//     console.log("---------------server started-------------")
// })

//Trying to design Library system using MVC architecture and file system
// const express = require('express');
// const morgan = require('morgan');
// const { apiRouter } = require('./api/routes');

// const app = express();
// app.use(morgan('dev'));
// app.use(express.json());

// app.use("/api/v1",apiRouter)

// app.listen(4000,()=>{
//     console.log("-------------server started----------")
// })
// require('dotenv').config()
// const mongoose = require('mongoose');

// const DbConnection = async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_DB_URL)
//         console.log("-----------DB connected---------------")
//     }
//     catch(err){
//         console.log("Error in database Connection",err.message);
//     }
// }
// DbConnection();
// require('dotenv').config()
// require("./config/db");
// const express = require('express');
// const morgan = require('morgan');
// const { StudentModel } = require('./Models/StudentSchema');

// const app = express();

// app.use(morgan('dev'));
// app.use(express.json());

// app.post("/",async(req,res)=>{
//     try{
//         const data = req.body;
//         await StudentModel.create(data);
//         res.status(201).json({
//             isSuccess:true,
//             message:"Student Entry Successfull"
//         })
//     }
//     catch(err){
//         if(err.code=="11000"){
//             res.status(500).json({
//             message:"Server Side Error"
//         })
//         }
//         console.log(err);
//         res.status(400).json({
//             message:"Enter required fields"
//         })
//     }
// })

// app.listen(4000,()=>{
//     console.log("----------------server started---------")
// })


require('dotenv').config()
require("./config/db")

const express = require('express');
const morgan = require('morgan');
const { apiRouter } = require('./api/routes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use("/api/v1",apiRouter)

app.listen(4000,()=>{
    console.log("-----------------server Started--------------")
})