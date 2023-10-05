import mongoose, { Schema, Types, model } from "mongoose";


const commentSchema = new mongoose.Schema({
  
    commentBody: { type: String, required: true },
  
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
  
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
}  , {
    timestamps: true
});
  

const commentModel = mongoose.models.Comment || model('Comment', commentSchema)
export default commentModel