
import joi from 'joi'
import { generalFields } from '../../middileware/validation.js'

export const signup = joi.object({
    userName: joi.string().min(2).max(20),
    email: generalFields.email,
    password: generalFields.password,
    age: joi.number().min(7).max(120),
    phone:joi.string().min(10).max(13)
}).required()



export const login = joi.object({
    email: generalFields.email,
    password: generalFields.password
}).required()



export const token = joi.object({
    token: joi.string().required(),

}).required()



export const sendCode = joi.object({
    email: generalFields.email
}).required()




export const forgetPassword = joi.object({
    email: generalFields.email,
    password: generalFields.password,
    cPassword: generalFields.cPassword,
    code: joi.string().pattern(new RegExp(/^\d{8}$/)).required()
}).required()

