import * as authController from './controller/registration.js'
import * as validators from './auth.validation.js'
import { Router } from "express";
import { validation } from '../../middileware/validation.js';
import { auth } from '../../middileware/auth.js';
import { fileUpload, fileValidation } from './../utils/multer.js';

const router = Router()



router.post('/signup',validation(validators.signup),
    authController.signup)


router.get('/confirmEmail/:token',
    validation(validators.token),
    authController.confirmEmail)

router.get('/NewConfirmEmail/:token',
    validation(validators.token),
    authController.RequestNewConfirmEmail)

 router.get("/unsubscribe/:token",
 validation(validators.token),
  authController.unsubscribe)

 router.get("/softDeleteUser",
 auth(),
 authController.softDeleteUser)

 router.delete("/deleteUser",
 auth(),
 authController.deleteUser)


router.post('/login',
    validation(validators.login),
    authController.login)

router.patch("/sendCode",
    validation(validators.sendCode),
    authController.sendCode)

router.patch("/forgetPassword",
    validation(validators.forgetPassword),
    authController.forgetPassword)
    
    router.get("/Logout",
    auth(), 
    authController.logout)


    router.patch("/updateProfilePic",
    auth(),
    fileUpload(fileValidation.post).single('profilePicture'),

    authController.updateProfileImage
    )

    router.patch("/updateCoverPic",
    auth(),
    fileUpload(fileValidation.post).single('coverPicture'),

    authController.
    updateCoverImage
    )
    router.get("/:userId",authController.userProfile)
    
export default router