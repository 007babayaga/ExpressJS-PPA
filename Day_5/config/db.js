const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL,{
    dbName:"Day-5-express",
})
.then(()=>{
    console.log("------------Database Conneted✅--------------")
})
.catch((err)=>{
    console.log("Error in Databse Connection ",err.message);
})