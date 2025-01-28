const AppError = require("../utils/appError");
const AWS = require("aws-sdk");
const SNS = new AWS.SNS({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});
const {Otp,User}=require("../models");
const { where } = require("sequelize");
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}
 const expiresAt = () => {
    const nowUTC = new Date(); // Current time in UTC
    const istOffset = (5.5 * 60 + 5) * 60 * 1000; // Adding 5 minutes (5 * 60 * 1000)
    const istDate = new Date(nowUTC.getTime() + istOffset); // Convert to IST
    return istDate;
};
const getIST = () => {
    const nowUTC = new Date(); // Current time in UTC
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds add 5 min extra

    const istDate = new Date(nowUTC.getTime() + istOffset); // Convert to IST
    return istDate;
};



 



exports.sendOtp=async(data)=>{
    try{
    var mobileNo = data.phone_number;
    var OTP = generateRandomNumber(1000,9999);
    console.log(OTP)
    
    var params = {
    Message: `Welcome! your mobile verification code is: “ + ${OTP} +`,
      PhoneNumber: mobileNo,
      };
      try {
        console.log("hello")
        const data = await SNS.publish(params).promise();
        let messageData={
            otp:OTP,
            exipres_at:await expiresAt()
        
        }
        const result=await Otp.create(messageData)
        return result.unique_id;
    } catch (error) {
        console.log('Error publishing message', error);
    }

    }catch(error){
        console.log(error)
        throw new AppError(error.message,error.StatusCode)


    }
 
}
exports.verifyOtp=async(data)=>{
    try{
        const result=await Otp.findOne({where:{unique_id:data.unique_id}})

        if(data && new Date(result.exipres_at)<await getIST())
        {
            throw new AppError("token expires",400)
        }else if(result.otp!=data.otp){
            throw new AppError("invalid token",400)


        }else{
            return true
        }

    }catch(error){
        throw new AppError(error.message,error.StatusCode)


    }
}
exports.createUser=async (data)=>{
    try{
        const userData=await User.findOne({where:{phone_number:data.phone_number,user_name:data.user_name}})
        console.log(userData)
        if(userData){
            throw new AppError("phone number or user_name already exist",409)
        }
    
        const createUser=await User.create(data)
        return true


    }catch(error){
        throw new AppError(error.message,error.StatusCode)

    }
}
exports.getAllUsers=async (data)=>{
    try{
        const result=await User.findAll({})
        return result

    }catch(error){
        throw new AppError(error.message,error.StatusCode)


    }
}
exports.getOneUser=async (userName)=>{
    console.log(userName)
    try{
        const result=await User.findOne({where:{user_name:userName}})
        return result

    }catch(error){
        throw new AppError(error.message,error.StatusCode)


    }
}

