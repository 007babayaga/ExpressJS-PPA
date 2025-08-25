require('dotenv').config()
require("./config/db.js")
const express = require('express');
const morgan = require('morgan');
const { apiRouter } = require('./api/v1/routes.js');

const PORT = process.env.PORT || 3900;
const app = express();

app.use(morgan('dev')); 

app.use(express.json()); 

app.use("/api/v1",apiRouter);                           

// ek health api to check if everyhting is working fine
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is running fine"
    })
})

app.listen(PORT,()=>{
    console.log("-------------server started🚀--------------")
})


