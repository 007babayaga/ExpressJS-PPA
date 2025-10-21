const userSignUpValidator = (req,res,next)=>{
    try{
        console.log("---------Inside UserSignUpValidator-------- ")
        const{name,email,otp,password} = req.body;

        if(!name || name.length<3){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Name"
            })
            return
        }

        if(!email){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Email"
            })
            return
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).{8,}$/;
        if(!password || !passwordRegex.test(password)){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Password"
            })
            return
        }
        if(!otp){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid OTP "
            })
            return
        }
        next();
    }

    catch(err){
        console.log("Error in userSignUpValidator:",err.message);
        res.status(500).json({
            isSuccess:false,
            message:" Server Erorr in validating user SignUp  "
        })
    }
}
const userLoginValidator = (req,res,next)=>{
    try{
        console.log("---------Inside userLoginValidator-------- ")
        const{email,password} = req.body;

        if(!email){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Email"
            })
            return
        }
        // const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).{8,10}$/;
        if(!password){
            res.status(400).json({
                isSuccess:false,
                message:"Enter valid Password "
            })
            return
        }
        next();
    }

    catch(err){
        console.log("Error in userLoginValidator:",err.message);
        res.status(500).json({
            isSuccess:false,
            message:" Server Erorr in validating user Login  "
        })
    }
}

module.exports={userLoginValidator,userSignUpValidator}