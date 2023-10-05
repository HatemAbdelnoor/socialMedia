import commentModel from "../../../../DB/model/comment.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import postModel from './../../../../DB/model/Post.model.js';


export const createComment = asyncHandler(async(req,res,next)=>{

    const { postId } = req.params;
    req.body.createdBy= req.user._id

    req.body.postId=postId

    req.body.createdBy=req.user._id

   const postisExist= await postModel.findOne({_id:postId ,isDeleted:false})
   if(!postisExist){
    return res.status(404).json({ message: 'Post not found' })
 }


 const coment = await commentModel.create(req.body)

  postisExist.comments.push(coment._id)
 await postisExist.save();


    return res.status(201).json({ message: "Done", coment })
})


export const updateComment=  asyncHandler(async(req, res, next)=>{


    const { commentId } = req.params;
    req.body.createdBy= req.user._id


const createdBy=req.user._id

   const comment= await commentModel.findOne({_id:commentId ,isDeleted:false})
   if(!comment){
    return res.status(404).json({ message: 'comment not found' })
 }
 if(!comment.createdBy==createdBy){
    return next(new Error("sorry you can only update or deleted your comment only ", { cause: 409 }))
  
   }


   const updatedTheComment =  await commentModel.updateOne({_id:commentId},{commentBody:req.body.commentBody})

   return res.status(201).json({ message: "Done", updatedTheComment })

})

export const allComments= asyncHandler(async(req, res, next)=>{


    const allComment= await commentModel.find({isDeleted:false}).populate({path:"replies"}).select("-isDeleted")

    return res.status(201).json({ message: "Done", allComment })
   




})

export const likeComment = asyncHandler( async (req, res) => {
 
    const { commentId } = req.params;
    const  userId  = req.user._id;

    const comment= await commentModel.findOne({_id:commentId ,isDeleted:false})
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' });
    }

    const isLiked = comment.likes.includes(userId);
    if (isLiked) {
      return res.status(400).json({ message: 'comment is already liked by the user' });
    }

    comment.likes.push(userId);
    await comment.save();

    res.status(200).json(comment);
  
})


export const UnlikeComment = asyncHandler(async(req,res,next) => {

  const { commentId } = req.params;
  const  userId  = req.user._id;

  const comment= await commentModel.findOne({_id:commentId ,isDeleted:false})
  if (!comment) {
    return res.status(404).json({ message: 'comment not found' });
  }
  const isLiked = comment.likes.indexOf(userId) 

 
   console.log(isLiked);

  if (isLiked<0) {
   return res.status(400).json({ message: `you didn't like the comment` });
}

comment.likes.splice(isLiked,1)
console.log(isLiked)
 await comment.save();


 return res.status(200).json({ message: `done` });



})