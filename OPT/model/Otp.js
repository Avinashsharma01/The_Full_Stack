const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const OTP = mongoose.model("otp", OtpSchema);
module.exports = OTP;