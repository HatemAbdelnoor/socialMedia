import * as commentController from './controller/comment.js';
const router = Router()
import { Router } from "express";
import { auth } from './../../middileware/auth.js';
import { validation } from '../../middileware/validation.js';
import * as validators from './comment.validation.js';

router.post('/:postId',
auth(),
validation(validators.createComment),
commentController.createComment)



router.patch('/:commentId', auth(),
validation(validators.updateComment),

commentController.updateComment)


router.put('/:commentId', auth(),
validation(validators.likeComment),

commentController.likeComment
)
router.post('/:commentId', auth(),
validation(validators.UnlikeComment),

commentController.UnlikeComment
)
router.get('/', 
commentController.allComments)

/*
router.delete('/:commentId', auth(),
commentController.deleteComment)
*/

export default router