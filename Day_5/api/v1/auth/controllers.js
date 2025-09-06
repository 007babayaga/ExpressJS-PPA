const { userModel } = require("../../../Models/userSchema");


const userSignUpController = async(req,res)=>{
    try{
        console.log("---------Inside userSignUpController ")
        const{name,email,password} = req.body;
        
        const newUser = await userModel.create({
            name,
            email,
            password
        }) 
        res.status(201).json({
            isSuccess:true,
            message:"User Created Successfully",
            data:{
                Email:newUser.email,
                ID:newUser.id
            }
        })
    }
    catch(err){
        console.log("Error in userSignUpController:",err.message);
        if(err.name==="ValidationError" || err.code ===11000){
            res.status(400).json({
                isSeccess:false,
                message:err.message
            })
            return
        }
        res.status(500).json({
            isSuccess:false,
            message:"Erorr in  user SignUp"
        })
    }
}

module.exports={userSignUpController}