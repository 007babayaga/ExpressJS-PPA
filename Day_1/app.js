const express = require('express');
const { myReadFile, mySaveFile } = require('./utils/file_Helper');

const app =  express();

app.use(express.json()); // middleware to read the (req) body

app.use((req,res,next)=>{            // this is a first middleware with three parameters(req,res,next)
    console.log(new Date(), req.method,req.url);
    next();
})

// app.use((req,res,next)=>{               // this is a second  middleware with three parameters(req,res,next)
//     console.log("second middleware");
//     next();
// })

app.get('/api/v1/products',async(req,res)=>{
    const data = await myReadFile("./data.json")
    res.status(200).json({
        isSucess:true,
        message:"(GET) is working fine",
        data:data,
    })
})
app.post('/api/v1/products',async(req,res)=>{
    const data = req.body;
    console.log(data)
    const oldData = await myReadFile("./data.json");
    oldData.push(data)
    await mySaveFile("./data.json",oldData)
    res.status(201).json({
        isSuccess:"true",
        message:"product added successfully"
    })
})

app.listen(3900,()=>{
    console.log('--------------server started--------------')
})