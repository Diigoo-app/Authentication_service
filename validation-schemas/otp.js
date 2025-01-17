// Importing the required modules
const { required } = require("joi");
const Joi = require("joi").extend(require("@joi/date"));

const sendOtpSchema = Joi.object({

    phone_number: Joi.string().required().messages({
        "string.base": "phone_number must be a string.",
        "any.required": "phone_number is required.",
    }),


    
});
const verifyOtp=Joi.object({

    otp: Joi.string().required().messages({
        "string.base": "otp must be a string.",
        "any.required": "otp is required.",
    }),
    unique_id: Joi.string().guid({ version: ['uuidv4'] }).required() // Validates UUIDv4


    
});



module.exports = {
    sendOtpSchema,
    verifyOtp
    };