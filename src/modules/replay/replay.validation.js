
import joi from 'joi'
import { generalFields } from '../../middileware/validation.js'

export const createReply = joi.object({
    replyBody: joi.string().min(2).max(280).required(),
    commentId:generalFields.id.required(),
}).required()



export const updateReply = joi.object({
    replyBody: joi.string().min(2).max(280).required(),
 replayId:generalFields.id.required()
}).required()



export const likeReply = joi.object({
   replayId:generalFields.id.required()

}).required()



export const UnlikeReply = joi.object({
   replayId:generalFields.id.required()

}).required()


