const express = require('express');
const morgan = require('morgan');
const { apiRouter } = require('./api/v1/routes');

const app = express();

app.use(morgan('dev')) // App level(global) middleware runs on Every request

app.get("/",(req,res)=>{
    res.status(200).json({
        isSuccess:'true',
        message:"server is running fine"
    })
})

app.use("/api/v1",apiRouter) // this is a route specific middleware > when this route matches it will goes to  apiRouter


app.listen(3900,()=>{
    console.log("---------server started----------")
})