const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL,{
    dbName:"Dummy-Products",
})
.then(()=>{
    console.log("------------Database Connected✅--------------")
})
.catch((err)=>{
    console.log("Error in Databse Connection ",err.message);
})
