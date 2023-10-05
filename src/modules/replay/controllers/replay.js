import replyModel from "../../../../DB/model/reply.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import commentModel from './../../utils/Comment.model.js';





export const createReplay =asyncHandler(async(req,res,next)=>{
    
    const {commentId}= req.params
    req.body.commentId = commentId
   req.body.createdBy = req.user._id

 const  comnent   = await commentModel.findById(commentId)

    if ( !comnent || comnent.isDeleted == true){
          
        return next(new Error("the comment is not exist   ", { cause: 404 }))

    }

  const   replay= await replyModel.create(req.body)
  
    comnent.replies.push(replay._id)
    
      await comnent.save();
 
 

    return res.status(201).json({ message: "Done", replay })



})

export const updateReplay =asyncHandler(async(req,res,next) => {

    const {reqplayId}= req.params
   const createdBy = req.user._id

   const replay = await replyModel.findOne({_id:reqplayId, isDeleted:false})

   if(!replay){
    return next(new Error("sorry the replay not found  ", { cause: 404 }))

   }
   if(!replay.createdBy==createdBy){
    return next(new Error("sorry you can only update or deleted you replay only ", { cause: 409 }))

   }

  const updatedReplay =  await replyModel.updateOne({_id:reqplayId},{replyBody:req.body.replyBody})

  return res.status(201).json({ message: "Done", updatedReplay })




})

export const deleteReplay= asyncHandler(async(req, res, next) => {


    const {reqplayId}= req.params
    const createdBy = req.user._id

    const replay = await replyModel.findOne({_id:reqplayId, isDeleted:false})

    if(!replay){
     return next(new Error("sorry the replay not found  ", { cause: 404 }))
 
    }
    if(!replay.createdBy==createdBy){
     return next(new Error("sorry you can only update or deleted you replay only ", { cause: 409 }))
 
    }
 
   const deletedReplay =  await replyModel.findByIdAndDelete({_id:reqplayId})
 
   return res.status(201).json({ message: "Done", deletedReplay })
 
 

})

export const likeReplay = asyncHandler( async (req, res) => {
 
  const { replayId } = req.params;
  const  userId  = req.user._id;

  const replay= await replyModel.findOne({_id:replayId ,isDeleted:false})
  if (!replay) {
    return res.status(404).json({ message: 'replay not found' });
  }

  const isLiked = replay.likes.includes(userId);
  if (isLiked) {
    return res.status(400).json({ message: 'replay is already liked by the user' });
  }

  replay.likes.push(userId);
  await replay.save();

  res.status(200).json(replay);

})


export const UnlikeReplay = asyncHandler(async(req,res,next) => {

const { replayId } = req.params;
const  userId  = req.user._id;

const replay= await replyModel.findOne({_id:replayId ,isDeleted:false})
if (!replay) {
  return res.status(404).json({ message: 'replay not found' });
}
const isLiked = replay.likes.indexOf(userId) 


 console.log(isLiked);

if (isLiked<0) {
 return res.status(400).json({ message: `you didn't like the replay` });
}

replay.likes.splice(isLiked,1)
console.log(isLiked)
await replay.save();


return res.status(200).json({ message: `done` });



})

export const allReplays= asyncHandler(async(req, res, next)=>{


  const allreplay= await replyModel.find({isDeleted:false}).select("-isDeleted")

  return res.status(201).json({ message: "Done", allreplay })
 




})