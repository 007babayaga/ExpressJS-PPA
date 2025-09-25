const sendUserInfoController = (req,res,next)=>{
    try{
        console.log("--------inside sendUserInfoController");
        const user = req.currentuser;
        res.status(200).json({
            isSuccess:true,
            message:"User Is Logged In",
            data:{
                Email:user.email
            }
        })
    }
    catch(err){
        console.log("---------Error in sendUserInfoController",err.message)
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error"
        })
    }
}
module.exports={sendUserInfoController}