require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("------------Database Connected✅---------------")
})
.catch((err)=>{
    console.log("Error in Database connection",err.message);
})