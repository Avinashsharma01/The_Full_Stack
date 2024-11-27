import mongoose from "mongoose";

const userRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const UserRegister = mongoose.model("UserRegister", userRegisterSchema);

export default UserRegister;