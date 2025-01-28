// Importing the required modules
const { required } = require("joi");
const Joi = require("joi").extend(require("@joi/date"));

const userSchema = Joi.object({

    user_name: Joi.string().required().messages({
        "string.base": "user_name must be a string.",
        "any.required": "user_name is required.",
    }),
    full_name: Joi.string().required().messages({
        "string.base": "full_name must be a string.",
        "any.required": "full_name is required.",
    }),

    date_of_birth:Joi.string().required().messages({
        "string.base": "date_of_birth must be a string.",
        "any.required": "date_of_birth is required.",
    }),
    gender: Joi.string().valid("male","female","others").required().messages({
        "string.base": "gender must be a string.",
        "any.required": "gender is required.",
    }),
    image: Joi.string().required().messages({
        "string.base": "image must be a string.",
        "any.required": "image is required.",
    }),
    interests:Joi.array().items(Joi.string().required()).required().min(5).messages({"item.base":"interests should string","any.required":"interests should be required"

    }),
        phone_number: Joi.string().required().messages({
            "string.base": "phone_number must be a string.",
            "any.required": "phone_number is required.",
        }),
    



    
});

   



module.exports = {
    userSchema

    };