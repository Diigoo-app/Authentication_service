 const catchAsync=require("../utils/catchAsync")
 const autheticationService=require("../services/authentication")
 const {sendOtpSchema,verifyOtp}=require("../validation-schemas/otp")
 const AppError = require("../utils/appError");

 exports.sendOtp=catchAsync(async(req,res)=>{
    try{
    const data=await sendOtpSchema.validateAsync(req.body)
    const result=await autheticationService.sendOtp(req.body)
    res.send({
        message:"send otp",
        id:result,
        status:true
    })
}catch(error){
    throw new AppError(error.message,error.StatusCode)

}
})
exports.verifyOtp=catchAsync( async (req,res)=>{
    try{
    const data=await verifyOtp.validateAsync(req.body)


    const result=await autheticationService.verifyOtp(data)
    res.send({
        message:"verifyed",
        status:true
    })
}catch(error){
    throw new AppError(error.message,error.StatusCode)

}
})
