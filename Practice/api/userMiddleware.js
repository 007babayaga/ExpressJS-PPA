
const jwt = require("jsonwebtoken");

const userLoggedInMiddleware = (req,res,next)=>{
    try{
        console.log("--------inside userLoggedInMiddleware");
        const {authorization} = req.cookies;
        if(!authorization){
            res.status(401).json({
                isSuccess:false,
                message:"Please Login First"
            })
            return;
        }
        jwt.verify(authorization,process.env.JWT_KEY,(err,data)=>{
            if(err){
                console.log("-------Invalid token",err.message)
                res.status(400).json({
                    isSuccess:false,
                    message:"Please Login firtst"
                })
                return
            }
            else{
                console.log("user",data)
                req.currentuser = data;
                next();
            }
        })
    }
    catch(err){
        console.log("---------Error in userLoggedInMiddleware",err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error"
        })
    }
}
module.exports={userLoggedInMiddleware}