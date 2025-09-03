import User, { IUser } from "../model/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import { Request, Response } from "express"
import { AuthenticatedRequest, JWTPayload, UserRegistrationData, UserLoginData, ChangePasswordData, ResetPasswordData } from "../types/index.js"

export const Register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, password_confirmation, tc }: UserRegistrationData = req.body;

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
        const user: IUser | null = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "Email already register"
            })
        }

        // hashed the password
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const newUser: IUser = new User({
            name,
            email,
            password: hashPass,
            tc
        })

        await newUser.save()
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

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password }: UserLoginData = req.body;

        // check All fields
        if (!email || !password) {
            return res.status(400).json({
                message: "email and password will be required"
            })
        }

        // check user is exist or not 
        const user: IUser | null = await User.findOne({ email })
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
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d"
            }
        )

        res.status(200).json({
            message: "Login successfully",
            Token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "server error"
        })
    }
}

export const ChangePassword = async (req: AuthenticatedRequest, res: Response)  => {
    try {
        const { currentPassword, newPassword, cfNewPassword }: ChangePasswordData = req.body;

        // check All fields
        if (!currentPassword || !newPassword || !cfNewPassword) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check new password match with confirm password
        if (newPassword !== cfNewPassword) {
            return res.status(400).json({
                message: "New password and confirm password do not match"
            })
        }

        // check password length
        if (newPassword.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user: IUser | null = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // check current password
        const isCurrentPassMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPassMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            })
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashNewPass = await bcrypt.hash(newPassword, salt);

        // update password in database
        await User.findByIdAndUpdate(user._id, { password: hashNewPass });

        res.status(200).json({
            message: "Password changed successfully"
        })

    } catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        res.json(req.user)
    } catch (error) {
        console.error("Get me error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const ForgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        }

        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Generate token
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2m" })
        user.resetToken = token
        user.resetTokenExpire = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
        await user.save()

        // Send email
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
        const subject = "Password Reset Request";
        const text = `You are receiving this email because you requested a password reset. Please click the following link to reset your password: ${resetUrl}`;

        await sendEmail(user.email, subject, text);

        res.status(200).json({
            message: "Password reset link sent to your email"
        })

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}

export const Resetpassword = async (req: Request, res: Response) => {
    try {
        const { password, password_confirmation }: ResetPasswordData = req.body;

        // Validate input
        if (!password || !password_confirmation) {
            return res.status(400).json({
                message: "Password and confirmation are required"
            })
        }

        if (password !== password_confirmation) {
            return res.status(400).json({
                message: "Passwords do not match"
            })
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long"
            })
        }

        // Verify JWT token and get user ID
        let decoded: JWTPayload;
        try {
            decoded = jwt.verify(req.params.token, process.env.JWT_SECRET as string) as JWTPayload;
        } catch (jwtError) {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        const user: IUser | null = await User.findOne({
            _id: decoded.userID,
            resetToken: req.params.token,
            resetTokenExpire: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired token"
            })
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Update user password and clear reset token
        user.password = hashPassword;
        user.resetToken = null;
        user.resetTokenExpire = undefined;
        await user.save();

        res.status(200).json({
            message: "Password reset successfully"
        })

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            message: "Server error"
        })
    }
}
