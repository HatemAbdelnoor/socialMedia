import { decode } from 'jsonwebtoken';
import userModel from '../../../../DB/model/User.model.js';
import { asyncHandler } from '../../utils/errorHandling.js';





export const getUsers =  asyncHandler(  async (req, res) => {
    const users = await userModel.find()
    return res.json({ message: "Done"  , users})
})


export const getUserProfile =asyncHandler( async (req, res) => {
    console.log(req.user);
        return res.json({ message: "done",user: req.user})




})
