
import connectDB from '../DB/connection.js'
import postRouter from './modules/posts/posts.router.js'
import userRouter from './modules/user/user.router.js'
import commentRouter from './modules/comment/comment.router.js'
import authRouter from './modules/auth/auth.router.js'
import requestIp  from 'request-ip'
import replyRouter from './modules/replay/replay.router.js'

import { globalErrorHandling } from './modules/utils/errorHandling.js'
const bootstrap = (app, express) => {
    app.get('/', (req, res) => {
        var clientIp = requestIp.getClientIp(req)
        res.send(`Your IP Address is ${clientIp}.`)
        console.log(clientIp);
      })
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/comment', commentRouter)
    app.use('/reply',replyRouter)


    app.use((error,req,res,next)=>{
        return res.json({message:error.message})
    })
    app.use("*", (req, res, next) => {
        return res.json({ message: "In-valid Routing" })
    })


    app.use(globalErrorHandling)
    connectDB()
}
export default bootstrap