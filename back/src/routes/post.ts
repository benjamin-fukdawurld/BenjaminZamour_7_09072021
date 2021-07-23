import { Router } from 'express';

import controller from '../controllers/post';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(), controller.getPosts.bind(controller));
router.get('/:id', auth(), controller.getPost.bind(controller));
router.post('/', auth(), controller.addPost.bind(controller));
router.patch('/:id', auth(), controller.updatePost.bind(controller));
router.delete('/:id', auth(), controller.deletePost.bind(controller));

export default router;
