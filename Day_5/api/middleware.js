const jwt = require('jsonwebtoken');

const validateLoggedInUserMiddleware = (req,res,next)=>{
    try{
        console.log("--------------inside validateLoggedInUserMiddleware------")
        const {authorization} = req.cookies;
        
        if(!authorization){
            console.log("---------Token is not present❌---------")
            res.status(401).json({
                isSuccess:false,
                message:"User Not LoggedIn"
            })
            return
        }
        jwt.verify(authorization,process.env.JWT_SECRET,(err,data)=>{
            if(err){
                console.log("-------------Invalid Token❌------")
                res.status(401).json({
                isSuccess:false,
                message:"User Not LoggedInn"
            })
            return
            }
            else{
                console.log("-------------valid User✅--------",data)
                req.currentuser=data;
                next();
            }
        })
    }
    catch(err){
        console.log("Error in validateLoggedInUserMiddleware",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"server Error While Validating user logging"
        })
    }
}

module.exports={validateLoggedInUserMiddleware}