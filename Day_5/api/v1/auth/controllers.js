const { userModel } = require("../../../Models/userSchema");
const bcrypt = require('bcrypt');

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
        if( err.code ===11000){
            res.status(409).json({
                isSeccess:false,
                message:"User Already exist! Please Login"
            })
            return
        }
        else if(err.name==="ValidationError" ){
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
const userLoginController = async(req,res)=>{
    try{
        console.log("---------Inside userLoginController----")
        const{email,password} = req.body;

        //user doc ko  users Collection se  lana hai using User Model and find it using entered email
        const userdoc = await userModel.findOne().where('email').equals(email).lean();
        if(userdoc==null){
            res.status(400).json({
                isSuccess:false,
                message:"User Doesn't Exist!! SignUp First"
            })
            return
        }
        const{password:hashedPassword} = userdoc;
        //match the password and the user Entered password
        const isCorrect = await bcrypt.compare(password.toString(),hashedPassword);
        if(!isCorrect){
            res.status(400).json({
                isSuccess:false,
                message:"Wrong Password"
            })
            return
        }

        res.status(200).json({
            isSuccess:true,
            message:"Login Success"
        })
    }
    catch(err){
        console.log("Error in userLoginController:",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Erorr in  user Login"
        })
    }
}

module.exports={userSignUpController,userLoginController}