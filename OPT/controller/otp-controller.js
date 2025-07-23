const twilio = require("twilio");
const OTP = require("../model/Otp");
const crypto = require("crypto");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


const sendotp = async (req, res) => {
    try {
        console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        const { phone } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashotp = crypto.createHash('sha256').update(otp).digest('hex');

        // await OTP.deleteMany({ phone });

        const newOTP = new OTP({ phone, otp: hashotp });
        await newOTP.save(); const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Use your Twilio phone number from .env
            to: phone
        });



        // await client.messages.create({
        //     body: `Your OTP is ${otp}`,
        //     from: '6201693634', // Replace with your Twilio number
        //     to: phone
        // });

        res.json({
            message: "OTP sent",
            SentMessage: message.body
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            return res.status(400).json({ message: "Phone and OTP are required" });
        }

        const hashotp = crypto.createHash('sha256').update(otp).digest('hex');
        const record = await OTP.findOne({ phone, otp: hashotp });

        if (!record) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // await OTP.deleteMany({ phone });

        return res.status(200).json({ message: "OTP verified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    sendotp,
    verifyOTP
};




// import Twilio from "twilio";
// import OTP from "../model/Otp.js";
// import crypto from "crypto"

// const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)


// const sendotp = async (req, res) => {
//     const { phone } = req.body
//     const otp = Math.floor(100000 + Math.random() * 900000).toString()

//     const hashotp = crypto.createHash('sha256').update(otp).digest('hex')

//     await OTP.deleteMany({ phone })

//     const newOTP = new OTP({ phone, otp: hashotp })
//     await newOTP.save();

//     await client.messages.create(
//         body = `Your Otp is ${otp}`,
//         from_ = '6201693634',
//         to = phone
//     )
//     res.json({
//         message: "otp sent"
//     })

// }



// const verifyOTP = async (req, res) => {
//     const { phone, otp } = req.body

//     const hashotp = crypto.createHash('sha256').update(otp).digest('hex')

//     const record = await OTP.findOne({ phone, otp: hashotp })

//     if (!record) {
//         return;
//     }
//     res.status(400).json({
//         message: "invalid or expire OTP"
//     })

//     await OTP.deleteMany({ phone })

//     res.status(200).json({
//         message: "Otp  verified"
//     })
// }

// export {
//     sendotp,
//     verifyOTP
// }