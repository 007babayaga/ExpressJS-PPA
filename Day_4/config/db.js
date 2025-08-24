const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL,
    {
        dbName:"Day_4_express",
    }
).then(()=>{
    console.log("-----------Database connected✅-----------------")
}).catch((err)=>{
    console.log("-----------Error in Database Connection-----------------",err.message)
})