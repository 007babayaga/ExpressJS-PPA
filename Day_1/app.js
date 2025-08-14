//making a server using express external module>npm init > npm i express

const express = require('express');

const app = new express();

app.use((req,res,next)=>{                // this is a first middleware with three parameters(req,res,next)
    console.log(new Date(), req.method,req.url);
    // next();
})

app.use((req,res,next)=>{               // this is a second  middleware with three parameters(req,res,next)
    console.log("second middleware");
    next();
})

app.get('/api/v1/products',(req,res)=>{
    res.json({
        isSucess:true,
        message:"(GET) is working fine",
        data:{},
    })
})
app.post('/api/v1/products',(req,res)=>{
    res.json({
        isSucess:true,
        message:"(POST) is working fine",
        data:{},
    })
})

app.listen(3900,()=>{
    console.log('--------------server started--------------')
})