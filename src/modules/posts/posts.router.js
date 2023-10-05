import * as PostController from './controller/posts.js';
import { Router } from "express";
import { auth } from './../../middileware/auth.js';
import { fileUpload, fileValidation } from './../utils/multer.js';
import { validation } from '../../middileware/validation.js';
import * as validators from './posts.validation.js';

const router = Router()



router.post('/createPost',
auth(),
fileUpload(fileValidation.post).single('post'),
validation(validators.createPost),

PostController.createPost)

router.patch('/:postId', auth(),
validation(validators.updatePost),

fileUpload(fileValidation.post).single('post'),

PostController.updatePost)

router.delete('/:postId', auth(),
validation(validators.likePost),

PostController.softDeletePost)

router.put('/:postId', auth(),
validation(validators.likePost),

PostController.likePost
)
router.post('/:postId', auth(),
validation(validators.UnlikePost),

PostController.UnlikePost
)

router.delete('/DeletepostDB/:postId', auth(),
validation(validators.likePost),

PostController.DeletepostDB)



router.get('/', 
PostController.allposts)

export default router