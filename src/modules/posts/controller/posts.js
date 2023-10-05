
import { asyncHandler } from './../../utils/errorHandling.js';
import userModel from '../../../../DB/model/User.model.js';

import postModel from './../../../../DB/model/Post.model.js';
import cloudinary from './../../utils/cloudinary.js';
import ApiFeatures from './../../utils/apiFeatures.js';
import commentModel from './../../../../DB/model/comment.model.js';
import replyModel from '../../../../DB/model/reply.model.js';
import  moment   from 'moment';


export const createPost =  asyncHandler(   async(req, res,next) => {

  if (req.file){

    const fullFileType=req.file.mimetype

    const createdBy =req.user._id
   const path = req.file.path

    
    if( fullFileType.startsWith("image"))
       
        {
          const { secure_url, public_id } = await cloudinary.uploader.upload(path, {folder: `${process.env.APP_NAME}/${createdBy}` } )

               req.body.images={secure_url, public_id}
    }
     if (fullFileType.startsWith("video")) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(path, {resource_type: "video", folder: `${process.env.APP_NAME}/${createdBy}` } )

      req.body.video={secure_url, public_id}
      
    } 

  }
    
req.body.createdBy=req.user._id
             const post =await postModel.create(
              req.body
             )
             
             return res.status(201).json({ message: "Done" , post })
});

export const updatePost =asyncHandler(async(req,res,next) => {

  const {postId}= req.params
 const createdBy = req.user._id

 const post = await postModel.findOne({_id:postId, isDeleted:false})

 if(!post){
  return next(new Error("sorry the Post not found  ", { cause: 404 }))

 }
 if(!post.createdBy==createdBy){
  return next(new Error("sorry you can only update or deleted you Post only ", { cause: 409 }))

 }

const updatedThePost =  await postModel.updateOne({_id:postId},{content:req.body.content})

return res.status(201).json({ message: "Done", updatedThePost })

})

 export const allpostsz = asyncHandler(async  (req, res,next) => {



  const apiFeature = new ApiFeatures(postModel.find({isDeleted:false}), req.query).paginate().filter().search().select()
  const postList = await apiFeature.mongooseQuery
  
  
  return res.status(200).json({ message: "Done", postList })
})

export const allposts = asyncHandler(async  (req, res,next) => {

  const startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);
  const endOfYesterday = new Date();
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);


  const posts = await postModel.find({createdAt:yesterday})
  
  
  return res.status(200).json({ message: "Done", posts })
})


 
export const softDeletePost= asyncHandler(async(req, res, next) => {



  const {postId}= req.params
  const createdBy = req.user._id

  const post = await postModel.findOne({_id:postId},{isDeleted:false})

  if(!post){
   return next(new Error("sorry the post not found or deleted  ", { cause: 404 }))

  }
  if(!post.createdBy==createdBy){
   return next(new Error("sorry you can only update or deleted you post only ", { cause: 409 }))

  }


 const deletedPost =  await postModel.findByIdAndUpdate({_id:postId},{isDeleted:true})
 const comments= await commentModel.find({ postId})
  const deleteComement= await commentModel.updateMany({postId},{isDeleted:true})
     
  for (let i = 0; i < comments.length; i++) {
    const element = comments[i];
    const replay = await replyModel.updateMany({commentId:element._id},{isDeleted:true});

  }

               
 
  if(post.video?.public_id){

    await cloudinary.uploader.destroy(post.video?.public_id) 
    return res.status(201).json({ message: "Done" })


  }
  if(post.images?.public_id ){
    await cloudinary.uploader.destroy(post.images?.public_id ) 
    return res.status(201).json({ message: "Done" })

  }


  return res.status(201).json({ message: "Done" })


})


export const likePost = asyncHandler( async (req, res) => {
 
    const { postId } = req.params;
    const  userId  = req.user._id;

    const post= await postModel.findOne({_id:postId ,isDeleted:false})
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      return res.status(400).json({ message: 'Post is already liked by the user' });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json(post);
  
})


export const UnlikePost = asyncHandler(async(req,res,next) => {

  const { postId } = req.params;
  const  userId  = req.user._id;

  const post= await postModel.findOne({_id:postId ,isDeleted:false})
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const isLiked = post.likes.indexOf(userId) 

 
   console.log(isLiked);

  if (isLiked<0) {
   return res.status(400).json({ message: `you didn't like the post` });
}

post.likes.splice(isLiked,1)
console.log(isLiked)
 await post.save();


 return res.status(200).json({ message: `done` });



})


export const DeletepostDB =asyncHandler(async(req, res, next)=>{



  const {postId}= req.params
  const createdBy = req.user._id

  const post = await postModel.findOne({_id:postId})

  if(!post){
   return next(new Error("sorry the post not found or deleted  ", { cause: 404 }))

  }
  if(!post.createdBy==createdBy){
   return next(new Error("sorry you can only update or deleted you post only ", { cause: 409 }))

  }


 const comments= await commentModel.find({ postId})
     
  for (let i = 0; i < comments.length; i++) {
    const element = comments[i];
    const replay = await replyModel.deleteMany({commentId:element._id});

  }
  const deleteComement= await commentModel.deleteMany({postId})


  const deletedPost =  await postModel.findOneAndDelete({_id:postId})

 
  if(post.video?.public_id){

    await cloudinary.uploader.destroy(post.video?.public_id) 
    return res.status(201).json({ message: "Done" })


  }
  if(post.images?.public_id ){
    await cloudinary.uploader.destroy(post.images?.public_id ) 
    return res.status(201).json({ message: "Done" })

  }


  return res.status(201).json({ message: "Done" })



}) 