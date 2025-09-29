const { userModel } = require("../../../Models/userSchema");

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
const getUserDeatailsController = async(req,res)=>{
    try{
        console.log("---------------Inside getUserInfoController -----")
        const{_id} = req.currentuser;

        const userDetails = await userModel.findOne({"_id":_id});

        res.status(200).json({
            isSuccess:true,
            message:"User Found",
            data:{
                UserName:userDetails.name,
                UserEmail:userDetails.email
            }
        })
    }
    catch(err){
        console.log("Error in getUserInfoController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal Server Error"
        })
    }
}
const getUserAllDeatailsController = async(req,res)=>{
    try{
        console.log("---------------Inside getUserAllDeatailsController -----")
        const{_id} = req.currentuser;

        const userDetails = await userModel.findOne({"_id":_id});

        res.status(200).json({
            isSuccess:true,
            message:"User Found",
            data:{
                userDetails
            }
        })
    }
    catch(err){
        console.log("Error in getUserAllDeatailsController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal Server Error"
        })
    }
}
module.exports={senduserInfoConroller,getUserDeatailsController,getUserAllDeatailsController}