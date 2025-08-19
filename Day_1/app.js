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

const FILE_PATH ="./data.json"
const ORDERS_PATH = "./orders.json"

 //get Api to fetch the product
app.get('/api/v1/products',async(req,res)=>{ 
    const data = await myReadFile(FILE_PATH);
    res.status(200).json({
        isSucess:true,
        message:"Products fetched successfully!",
        data:data,
    })
})

 //post api to add products

app.post('/api/v1/products',async(req,res)=>{ 
    const data = req.body;
    console.log(data)
    data.id = uuidv4();
    const oldData = await myReadFile(FILE_PATH);
    oldData.push(data)
    await mySaveFile(FILE_PATH,oldData)
    res.status(201).json({
        isSuccess:"true",
        message:"product added successfully"
    })
})

//patch Api to update product
app.patch("/api/v1/products/:productId",async(req,res)=>{ 
    const{productId} = req.params;
    const data = req.body;
   //get old array
    const products = await myReadFile(FILE_PATH)
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
   await mySaveFile(FILE_PATH,products)
   res.status(200).json({
    isSuccess:"true",
    message:"Product updated successfully"
   })
})

  //Delete Api to delete a product
app.delete("/api/v1/products/:productId",async(req,res)=>{ 
    const{productId} = req.params;
    //Get the old Array
    const allPdt = await myReadFile(FILE_PATH);
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
    await mySaveFile(FILE_PATH,allPdt);
    res.status(204).json({
        isSuccess:"true",
        message:"product deleted successfully"
    })
})

//post api to add Orders in orders file
app.post("/api/v1/orders",async(req,res)=>{
    const data = req.body;
    const{productId} = data;
    // read the pdts Array

    const allItems = await myReadFile(FILE_PATH);

    const idx = allItems.findIndex((ele)=>{
        return ele.id == productId
    })
    if(idx===-1){
        res.status(400).json({
            isSucess:'false',
            message:"Wrong produvct Id"
        })
        return;
    }
    const oldObj = allItems[idx];
    const oldQuantity = allItems[idx].quantity;
    if(oldQuantity<=0){
        res.status(503).json({
            isSuccess:'false',
            message:"Item is out of stock"
        })
    }
    allItems[idx] = {...oldObj,quantity:oldQuantity-1}

    await mySaveFile(FILE_PATH,allItems);
    const oldOrders =await myReadFile(ORDERS_PATH)
    oldOrders.push({orderId:uuidv4(),productId:productId});
    await mySaveFile(ORDERS_PATH,oldOrders);

    res.status(201).json({
        isSucess:"true",
        message:"Item Added to Cart Successfully"
    })
})

// get api to get all orders
app.get("/api/v1/orders",async(req,res)=>{
    const allOrders = await myReadFile(ORDERS_PATH)
    res.status(200).json({
        isSucess:"true",
        message:"Orders Fetched Successfully",
        data:allOrders
    })
})


app.listen(3900,()=>{
    console.log('--------------server started--------------')
})
