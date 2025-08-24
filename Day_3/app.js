const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://rajat-MERN-developer:Rajat123@cluster0.nw5hcy4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("------------Database Connected✅---------------")
})
.catch((err)=>{
    console.log("Error in Database connection",err.message);
})