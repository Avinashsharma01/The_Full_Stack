import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tc: {
        type: Boolean,
        required: true,
    },
    resetToken: String,
    resetTokenExpire: Date
}, { timestamps: true })


const userModel = mongoose.model("user", userSchema)

export default userModel