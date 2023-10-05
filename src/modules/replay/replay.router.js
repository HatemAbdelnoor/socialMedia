import * as replayController from'./controllers/replay.js';
const router = Router()
import { Router } from "express";
import { auth } from './../../middileware/auth.js';
import { validation } from '../../middileware/validation.js';
import * as validators from  './replay.validation.js';


router.post('/:commentId',
auth(),

validation( validators.createReply),

replayController.createReplay)

router.put('/:replayId', auth(),
validation( validators.likeReply),

replayController.likeReplay
)
router.post('/:replayId', auth(),
validation( validators.UnlikeReply),

replayController.UnlikeReplay
)


router.delete('/:replayId', auth(),
validation( validators.UnlikeReply),
replayController.deleteReplay)


router.patch('/:replayId', auth(),
validation( validators.updateReply),

replayController.updateReplay)

router.get('/', 
replayController.allReplays)



export default router