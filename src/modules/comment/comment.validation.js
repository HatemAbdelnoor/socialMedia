
import joi from 'joi'
import { generalFields } from '../../middileware/validation.js'

export const createComment = joi.object({
    commentBody: joi.string().min(2).max(280).required(),
   postId:generalFields.id.required()
}).required()



export const updateComment = joi.object({
    commentBody: joi.string().min(2).max(280).required(),
   postId:generalFields.id.required()
}).required()



export const likeComment = joi.object({
    CommentId:generalFields.id.required()

}).required()



export const UnlikeComment = joi.object({
    CommentId:generalFields.id.required()

}).required()


