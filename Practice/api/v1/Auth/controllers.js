const { userModel } = require("../../../Models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        if(err.code===11000){
            res.status(409).json({
            isSuccess:false,
            message:"user already exist please login"
        })
        return
        }
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error while  creating user"
        })
    }
}
const userLoginController = async(req,res)=>{
    try{
        console.log("-----------Inside userLoginController--");
        const{email,password} = req.body;
        const userDocs = await userModel.findOne().where("email").equals(email).lean();

        if(userDocs==null){
            res.status(400).json({
                isSuccess:false,
                message:"Please SignUp First"
            })
            return
        }
        const{password:hashedPass} = userDocs;
        const isCorrect = await bcrypt.compare(password.toString(),hashedPass)

        if(!isCorrect){
            res.status(400).json({
                isSuccess:false,
                message:"Wrong Password"
            })
            return
        }
        const token = jwt.sign(
            {
                email:userDocs.email,
                id:userDocs.id
            },
            process.env.JWT_KEY,
            {
                expiresIn:60*60*24
            }            
        )
        res.cookie("authorization",token,{
            httpOnly:true,
            secure:true,
            sameSite:"None",
        })
        res.status(200).json({
            isSuccess:true,
            message:"Logged in Successfully",
        })

    }
    catch(err){
        console.log("Error in userLoginController",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error while  Logging user"
        })
    }
}
module.exports={createUserController,userLoginController}