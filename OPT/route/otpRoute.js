const express = require("express");
const router = express.Router();
const { sendotp, verifyOTP } = require("../controller/otp-controller");

router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyOTP);

module.exports = router;