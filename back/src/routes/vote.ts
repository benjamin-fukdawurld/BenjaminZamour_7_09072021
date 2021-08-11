import { Router } from 'express';

import controller from '../controllers/vote';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(), controller.getVotes.bind(controller));
router.get('/comment/:commentId', auth(), controller.getVotes.bind(controller));
router.get('/post/:postId/', auth(), controller.getVotes.bind(controller));

router.post('/', auth(), controller.addVote.bind(controller));

router.get('/comment/:commentId/:employeeId', auth(), controller.getVote.bind(controller));
router.get('/post/:postId/:employeeId', auth(), controller.getVote.bind(controller));

router.put('/comment/:commentId/:employeeId', auth(), controller.updateVote.bind(controller));
router.put('/post/:postId/:employeeId', auth(), controller.updateVote.bind(controller));

router.delete('/comment/:commentId/:employeeId', auth(), controller.deleteVote.bind(controller));
router.delete('/post/:postId/:employeeId', auth(), controller.deleteVote.bind(controller));

export default router;
