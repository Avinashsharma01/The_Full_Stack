import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
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

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export default UserLogin;