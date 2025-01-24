const express=require("express")
const router=express.Router()
const authenticationController=require("../controller/authetication")
router.post("/send-otp",authenticationController.sendOtp)
router.post("/verify-otp",authenticationController.verifyOtp)
router.post("/create-user",authenticationController.createUser)
module.exports=router