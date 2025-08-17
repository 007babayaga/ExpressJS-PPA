const express = require('express');
const { myReadFile, mySaveFile } = require('./utils/file_Helper');
const { v4: uuidv4 } = require('uuid');

const app =  express();

app.use(express.json());// middleware to read the (req) body

app.use((req,res,next)=>{            // this is a first middleware with three parameters(req,res,next)
    console.log(new Date(), req.method,req.url);
    next();
})

app.use((req,res,next)=>{               // this is a second  middleware with three parameters(req,res,next)
    console.log("second middleware");
    next();
})

app.get('/api/v1/products',async(req,res)=>{  //get Api
    const data = await myReadFile("./data.json")
    res.status(200).json({
        isSucess:true,
        message:"Products fetched successfully!",
        data:data,
    })
})

app.post('/api/v1/products',async(req,res)=>{  //post api
    const data = req.body;
    console.log(data)
    data.id = uuidv4();
    const oldData = await myReadFile("./data.json");
    oldData.push(data)
    await mySaveFile("./data.json",oldData)
    res.status(201).json({
        isSuccess:"true",
        message:"product added successfully"
    })
})

app.patch("/api/v1/products/:productId",async(req,res)=>{ //patch Api
    const{productId} = req.params;
    const data = req.body;
   //get old array
    const products = await myReadFile("./data.json")
   //find the object in the array using Id
   // array search method(find Index)
    const idx = products.findIndex((ele)=>{
    return ele.id === productId;
    })

    if(idx===-1){
    res.status(400).json({
        isSucess:"false",
        message:"wrong id entered by the user"
    })
    return;
    }
   //change old object to replace its properties
   //updated obeject - save it in the array
    const oldObj = products[idx];
    products[idx] = {...oldObj,...data};
   //updated array -save it into the file
   await mySaveFile("./data.json",products)
   res.status(200).json({
    isSuccess:"true",
    message:"Product updated successfully"
   })
})

app.delete("/api/v1/products/:productId",async(req,res)=>{   //Delete Api
    const{productId} = req.params;
    //Get the old Array
    const allPdt = await myReadFile("./data.json");
    //find the Index with the Id
    const idx = allPdt.findIndex((ele)=>{
        return ele.id===productId;
    })
    if(idx===-1){
    res.status(400).json({
        isSucess:"false",
        message:"Invalid Product Id"
    })
    return;
    }
    // delete the product from the existing array
     allPdt.splice(idx,1)

    //save the updated Array
    await mySaveFile("./data.json",allPdt);
    res.status(204).json({
        isSuccess:"true",
        message:"product deleted successfully"
    })
})

app.listen(3900,()=>{
    console.log('--------------server started--------------')
})
