import mongoose, { Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    tc: boolean;
    resetToken?: string | null;
    resetTokenExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
}

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

const userModel = mongoose.model<IUser>("user", userSchema)

export default userModel