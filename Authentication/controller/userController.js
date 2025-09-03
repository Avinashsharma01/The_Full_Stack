import User from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js"

export const Register = async (req, res) => {
    try {
        const { name, email, password, password_confirmation, tc } = req.body;

        // validate user 
        if (!name || !email || !password || !password_confirmation) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check password match
        if (password !== password_confirmation) {
            return res.status(400).json({
                message: "Password do not match"
            })
        }

        // find existing user in the database
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "Email already register"
            })
        }

        // hashed the password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashPass,
            tc
        })

        newUser.save()
        res.status(200).json({
            message: "User Register Successfully"
        })

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "server error"
        })
    }
}


export const Login = async (req, res) => {
    try {
        // console.log(req.headers);
        const { email, password } = req.body;

        // check All fields
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password will be required"
            })
        }


        // check user is exist or not 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        // check password
        const isPassMatch = await bcrypt.compare(password, user.password)

        if (!isPassMatch) {
            return res.status(400).json({
                message: "Password do not match"
            })
        }

        const token = jwt.sign(
            {
                userID: user._id,
                email: user.email
            }
            , process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
        )

        res.status(200).json({
            message: "Login successfully",
            Token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                // MYpassword: password,
                // DBpassword: user.password,
                tc: user.tc
            }

        })
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}



// change password 
// export const ChangePassword = async (req, res) => {
//     try {
//         const { currentPassword, newPassword, cfNewPassword } = req.body

//         // check all field 
//         if (!currentPassword || !newPassword || !cfNewPassword) {
//             return res.status(400).json({
//                 message: "All field requird"
//             })
//         }

//         if (newPassword !== cfNewPassword) {
//             return res.status(400).json({
//                 message: "New password do not match"
//             })
//         }


//         const user = await User.findById(req.user._id)
//         const ispassMatch = await bcrypt.compare(currentPassword, user.password)

//         if (!ispassMatch) {
//             return res.status(400).json({
//                 message: "Current Password is incorrect"
//             })
//         }


//         const salt = await bcrypt.genSalt(10)
//         const hashPass = await bcrypt.hash(newPassword, salt)

//         user.password = hashPass;
//         await user.save();

//         res.status(200).json({
//             message: "Password changed successfully"
//         })

//     } catch (error) {
//         console.error("Change password error:", error);
//         res.status(500).json({ message: "Server error" });
//     }

// }


export const ChangePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, cfNewPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword || !cfNewPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (newPassword !== cfNewPassword) {
            return res.status(400).json({
                message: "New passwords do not match"
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            });
        }

        const user = await User.findById(req.user._id);   // req.user is attached by the authMiddleware
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPassMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPassMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({
                message: "New password must be different from the current password"
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const getMe = async (req, res) => {
    res.json(req.user)
}


export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // const token = crypto.randomBytes(20).toString("hex")
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "2m" })
        user.resetToken = token
        user.resetTokenExpire = Date.now() + 15 * 60 * 1000 // 15 minutes
        await user.save()

        const resetURL = `http://localhost:${process.env.PORT || 3000}/reset-password/${token}`;

        const emailContent = `
Hello,

You requested to reset your password. Click the link below to reset it:

${resetURL}

This link will expire in 2 minutes for security reasons.

If you didn't request this, please ignore this email.

Best regards,
${process.env.APP_NAME || 'Authentication App'} Team
        `;

        await sendEmail(user.email, 'Reset Your Password', emailContent);

        res.status(200).json({
            message: "Reset email sent successfully"
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Server error" });
    }
}



export const Resetpassword = async (req, res) => {
    try {
        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        // Verify JWT token and get user ID
        let decoded;
        try {
            decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        } catch (jwtError) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        const user = await User.findOne({
            _id: decoded.userID,
            resetToken: req.params.token,
            resetTokenExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            })
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        user.password = hashPass
        user.resetToken = undefined
        user.resetTokenExpire = undefined

        await user.save()

        res.status(200).json({
            message: "Password updated successfully"
        })

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
}