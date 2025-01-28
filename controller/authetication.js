 const catchAsync=require("../utils/catchAsync")
 const autheticationService=require("../services/authentication")
 const {sendOtpSchema,verifyOtp}=require("../validation-schemas/otp")
 const {userSchema}=require("../validation-schemas/user")

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
exports.createUser=catchAsync( async (req,res)=>{
    try{
    const data=await userSchema.validateAsync(req.body)


    const result=await autheticationService.createUser(data)
    res.send({
        message:"user is created",
        status:true
    })
}catch(error){
    throw new AppError(error.message,error.StatusCode)

}
})
exports.getAllUsers=catchAsync( async (req,res)=>{
    try{


    const result=await autheticationService.getAllUsers()
    res.send({
        message:"user is created",
        status:true,
        data:result
    })
}catch(error){
    throw new AppError(error.message,error.StatusCode)

}
})
exports.getOneUser=catchAsync( async (req,res)=>{
    try{
         if(!req.query.userName){
            throw new AppError("userName is required",400)

         }


    const result=await autheticationService.getOneUser(req.query.userName)
    res.send({
        message:"user is created",
        status:true,
        data:result
    })
}catch(error){
    throw new AppError(error.message,error.StatusCode)

}
})