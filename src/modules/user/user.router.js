import { auth } from './../../middileware/auth.js';
import * as userController from './controller/user.js'
import { Router } from "express";
const router = Router()

router.get('/', userController.getUsers )
router.get('/profile',auth, userController.getUserProfile )

export default router