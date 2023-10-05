import mongoose, { Schema, Types, model } from "mongoose";

const postSchema = new Schema({
    
    content: { type: String, required: true },
    
    images: Object,
    
    video: Object,
    
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    
    isDeleted: { type: Boolean, default: false },

    
    privacy: { type: String, enum: ['public', 'only me'], default: 'public' },
  }  , {
    timestamps: true
});
  
  const postModel = mongoose.models.Post || model('Post', postSchema)
export default postModel