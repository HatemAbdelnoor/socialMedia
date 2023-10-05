import mongoose, { Schema, Types, model } from "mongoose";


const replySchema = new mongoose.Schema({
    
    replyBody: { type: String, required: true },
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },

  
}  , {
    timestamps: true
}

);

  
const replyModel = mongoose.models.Reply || model('Reply', replySchema)
export default replyModel