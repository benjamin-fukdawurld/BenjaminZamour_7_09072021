import { Router } from 'express';

import controller from '../controllers/comment';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(), controller.getComments.bind(controller));
router.get('/:id', auth(), controller.getComment.bind(controller));
router.post('/', auth(), controller.addComment.bind(controller));
router.patch('/:id', auth(), controller.updateComment.bind(controller));
router.delete('/:id', auth(), controller.deleteComment.bind(controller));

export default router;
