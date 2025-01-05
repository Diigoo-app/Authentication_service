const express=require("express")
const router=express.Router()
const authenticationController=require("../controller/authetication")
router.get("/test-api",authenticationController.sampleApi)
module.exports=router