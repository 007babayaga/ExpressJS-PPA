const express = require("express");
const { readFile, saveFile } = require("./utils/Helper");
const { v4: uuidv4 } = require('uuid');
// require("dotenv").config();

const app = express();

//Middleware zero 
app.use(express.json());

//Middleware one
app.use((req,res,next)=>{
    console.log("first Middleware");
    console.log(req.method,req.url);
    next();
})

//Middleware two
app.use((req,res,next)=>{
    console.log("Insdie second Middleware");
    next();
})

//CRUD operations

// post Api to Add produts in file
app.post("/api/v1/products",async(req,res)=>{
    const data = req.body;
    data.id = uuidv4();
    const oldData = await readFile("./data.json")
    oldData.push(data);
    await saveFile("./data.json",oldData)
    res.status(201).json({
        isSucess:"true",
        message:"Item added successfully"
    })
})

// //get api to read products
app.get("/api/v1/products",async(req,res)=>{
    const data = await readFile("./data.json");
    res.status(200).json({
        isSuccess:"true",
        message:"items Fetched sucessfully",
        data:data
    })
})

// //patch api to update a product 
app.patch("/api/v1/products/:productId",async(req,res)=>{
    const{productId} = req.params;
    const data = req.body;
    //get the products
    const allPdt = await readFile("./data.json");
    //search for Products havind the id
    const idx = allPdt.findIndex((ele)=>{
        return ele.id ==productId;
    })
    if(idx==-1){
        res.status(400).json({
            message:"wrong id enterd by user"
        })
        return;
    }
    const oldObj = allPdt[idx];
    allPdt[idx]={...oldObj,...data}
    //save it again
    await saveFile("./data.json",allPdt);
    res.status(200).json({
        isSuccess:"true",
        message:"Item updated sucessfully"
    })
})

// //delete api to delete a product 

app.delete("/api/v1/products/:productId",async(req,res)=>{
    const{productId} = req.params;
    const alldata = await readFile("./data.json");

    const idx = alldata.findIndex((ele)=>{
        return ele.id === productId;
    })
    if(idx==-1){
        res.status(400).json({
            message:"wrong id enterd by user"
        })
        return;
    }
    alldata.splice(idx,1);

    await saveFile("./data.json",alldata);
    res.status(200).json({
        isSuccess:"true",
        message:"Item deleted sucessfully"
    })
})


app.listen(3900,()=>{
    console.log("-----------server started--------------")
})
//some error I was seeing