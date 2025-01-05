 const catchAsync=require("../utils/catchAsync")
 const autheticationService=require("../services/authentication")
exports.sampleApi=catchAsync( async (req,res)=>{

    const result=await autheticationService.sampleApi()
    res.send({
        message:result,
        status:true
    })
})