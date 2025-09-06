const userSignUpValidator = (req,res,next)=>{
    try{
        console.log("-----------Inside userSignUpValidator--");
        const{name,email,password} = req.body;

        if(!name|| name.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a Valid Name"
            })
            return
        }
        const reGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!email || !reGmail.test(email)){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a Valid Email"
            })
            return
        }
        if(!password || password.length<1){
            res.status(400).json({
                isSuccess:false,
                message:"Enter a Valid password"
            })
            return
        }
        next();
    }
    catch(err){
        console.log("Error in userSignUpValidator",err.message);
        res.status(500).json({
            isSuccess:false,
            message:"Internal server Error while Validating user SignUp"
        })
    }
}

module.exports={userSignUpValidator}