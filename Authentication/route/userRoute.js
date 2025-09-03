import express from "express"
const router = express.Router()

import { ChangePassword, ForgotPassword, getMe, Login, Register, Resetpassword } from "../controller/userController.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/register", Register)
router.post("/login", Login)
router.post("/changepass", protect, ChangePassword)
router.get("/getme", protect, getMe)

router.post("/forgotPass", ForgotPassword)
router.post("/resetPass/:token", Resetpassword)





export default router