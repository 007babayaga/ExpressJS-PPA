const senduserInfoConroller = (req,res)=>{
    try{
        console.log("---------------Inside senduserInfoConroller -----")
        const user = req.currentuser;
        res.status(200).json({
            isSuccess:true,
            message:"User is Logged In",
            data:{
                email:user.email
            }
        })
    }
    catch(err){
        console.log("Error in senduserInfoConroller",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal Server Error"
        })
    }
}
module.exports={senduserInfoConroller}