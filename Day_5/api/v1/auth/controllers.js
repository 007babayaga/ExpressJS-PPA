const { userModel } = require("../../../Models/userSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("../../../utils/tokenToEmailHelper");

const userSignUpController = async (req, res) => {
    try {
        console.log("---------Inside userSignUpController ")
        const { name, email, password } = req.body;

        const newUser = await userModel.create({
            name,
            email,
            password
        })
        res.status(201).json({
            isSuccess: true,
            message: "User Created Successfully",
            data: {
                Email: newUser.email,
                ID: newUser.id
            }
        })
    }
    catch (err) {
        console.log("Error in userSignUpController:", err.message);
        if (err.code === 11000) {
            res.status(409).json({
                isSeccess: false,
                message: "User Already exist! Please Login"
            })
            return
        }
        else if (err.name === "ValidationError") {
            res.status(400).json({
                isSeccess: false,
                message: err.message
            })
            return
        }
        res.status(500).json({
            isSuccess: false,
            message: "Erorr in  user SignUp"
        })
    }
}
const userLoginController = async (req, res) => {
    try {
        console.log("---------Inside userLoginController----")
        const { email, password } = req.body;

        //user doc ko  users Collection se  lana hai using User Model and find it using entered email
        const userdoc = await userModel.findOne().where('email').equals(email).lean();
        if (userdoc == null) {
            res.status(400).json({
                isSuccess: false,
                message: "User Doesn't Exist!! SignUp First"
            })
            return
        }
        const { password: hashedPassword } = userdoc;
        //match the password and the user Entered password
        const isCorrect = await bcrypt.compare(password.toString(), hashedPassword);
        if (!isCorrect) {
            res.status(400).json({
                isSuccess: false,
                message: "Wrong Password"
            })
            return
        }
        const token = jwt.sign(
            {
                email: userdoc.email,
                _id: userdoc._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24
            }
        )

        res.cookie("authorization", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 24 * 1000
        })

        res.status(200).json({
            isSuccess: true,
            message: "Login Success!",
            // data:{
            //     email:userdoc.email,
            //     _id:userdoc.id
            // }
        })
    }
    catch (err) {
        console.log("Error in userLoginController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Erorr in  user Login"
        })
    }
}

const userLogoutController = async (req, res) => {
    try {
        console.log("---------Inside userLogoutController----")

        // For Logout just remove the Cookie to empty String
        res.cookie("authorization", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 0
        })

        res.status(200).json({
            isSuccess: true,
            message: "Logout Success"
        })
    }
    catch (err) {
        console.log("Error in userLogoutController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Erorr in  user Logout"
        })
    }
}
const resetPasswordController = async (req, res) => {
    try {
        console.log("---------Inside resetPasswordController-------------")
        const { email } = req.body;

        //Find the existing user from the UserModel
        const userdoc = await userModel.findOne({ email });

        // Always return success to prevent email enumeration -security purposes
        if (!userdoc) {
            console.log("No user found with email:", email);
            res.status(200).json({
                isSuccess: true,
                message: "If an account with that email exists, a reset link has been sent."
            });
            return
        }

        // Then  Generate reset token 
        const resetToken = jwt.sign(
            {
                email: userdoc.email,
                _id: userdoc._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 600
            }
        )

        // Set token expiry (10 min from now)
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000;

        // Now save the hashedtoken and tokenExpiry in Db
        await userModel.findOneAndUpdate({ email },
            {
                resetPasswordToken: resetToken,
                resetPasswordExpire: resetTokenExpiry,
            }
        );
        console.log("Reset token generated for user:", userdoc.email);

        //Send reset Toekn to the Email
        await sendResetEmail(userdoc, resetToken);

        res.status(200).json({
            isSuccess: true,
            message: "If an account with that email exists, a reset link has been sent."
        });

    }
    catch (err) {
        console.log("Error in resetPasswordController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Erorr in resetPasswordController"
        })
    }
}
const validateResetTokenController = async (req, res) => {
    try {
        console.log("---------Inside validateResetTokenController----")
        const { token } = req.params;

        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
                    if(err){
                        console.log("-------------Invalid Token❌------")
                        res.status(401).json({
                        isSuccess:false,
                        message:"Invalid Reset link"
                    })
                    return
                    }
                    else{
                        console.log("-------------valid Token✅--------",data)
                    }
                })

            res.status(200).json({
                isSuccess: true,
                message: "Valid reset token",
            });

    } catch (err) {
        console.log("Error in validateResetTokenController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Error in validateResetTokenController"
        })
    }
}

const resetPasswordWithTokenController = async (req, res) => {
    try {
        console.log("---------Inside resetPasswordWithTokenController----")
        const { token } = req.params;
        const { password } = req.body;

        // Find user by token and check expiry
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid or expired reset token"
            });
            return
        }

        // Check if new password is same as old password
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            res.status(400).json({
                isSuccess: false,
                message: "New password cannot be the same as old password"
            });
            return
        }

        // Update user password and clear reset token fields
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save(); // This will trigger the pre-save hook to hash the password

        console.log("Password reset successfully for user:", user.email);

        res.status(200).json({
            isSuccess: true,
            message: "Password reset successfully. Please login with your new password."
        });
    }
    catch (err) {
        console.log("Error in resetPasswordWithTokenController :", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Server Erorr in resetPasswordWithTokenController "
        })
    }
}



module.exports = { userSignUpController, userLoginController, userLogoutController, resetPasswordController, resetPasswordWithTokenController, validateResetTokenController }