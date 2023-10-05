
import joi from 'joi'
import { generalFields } from '../../middileware/validation.js'

export const createPost = joi.object({
    content: joi.string().min(4).max(500).required(),
    file:joi.object()
}).required()



export const updatePost = joi.object({
    postBody: joi.string().min(2).max(280).required(),
   postId:generalFields.id.required()
}).required()



export const likePost = joi.object({
    postId:generalFields.id.required()

}).required()



export const UnlikePost = joi.object({
    postId:generalFields.id.required()

}).required()


