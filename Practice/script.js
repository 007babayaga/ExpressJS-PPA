// 1. Make the server
const express = require('express');
const { readFile, saveData } = require('./utils/Helper');

//2.instance of express
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log("first middleware");
    next();
})

app.use((req,res,next)=>{
    console.log("second middleware");
    next();
})

app.post('/api/v1/products',async(req,res)=>{
    const data = req.body;
    console.log(data);

    const oldData = await readFile("./data.json")
    oldData.push(data);
    await saveData("./data.json",oldData)
    res.status(201).json({
        isSucess:"true",
        message:"item added successfully"
    })
})
app.get('/api/v1/products',async(req,res)=>{
    const ans = await readFile("./data.json")
    res.status(200).json({
        isSucess:"true",
        message:"item added successfully",
        data:ans
    })
})


//3.listen to a port number
app.listen(3900,()=>{
    console.log('------------server started-----------')
})