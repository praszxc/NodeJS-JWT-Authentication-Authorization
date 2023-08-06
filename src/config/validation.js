const joi = require("joi")

const registerValidation = (data) => {
    const schema = joi.object({
        email: joi.string()
            .email()
            .required(),
        name: joi.string()
            .required(),
        code: joi.string()
            .max(3)
            .required(),
        password: joi.string()
            .min(8)
            .required()
    })

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = joi.object({
        code: joi.string()
            .max(3)
            .required(),
        password: joi.string()
            .min(8)
            .required()
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
