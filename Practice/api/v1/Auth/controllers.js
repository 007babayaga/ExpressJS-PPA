const { userModel } = require("../../../Models/userSchema");

const createUserController = async(req,res)=>{
    try{
        console.log("-----------Inside createUserController--");
        const{email,password} = req.body;
        const newUser = await userModel.create({
            password,
            email,
        })
        res.status(201).json({
            isSuccess:true,
            message:"User created Successfully",
            data:{
                USER:{
                    Email:newUser.email,
                    _id:newUser.id
                }
            }
        })

    }
    catch(err){
        console.log("Error in createUserController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error while  creating user"
        })
    }
}
module.exports={createUserController}