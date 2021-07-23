import { Router } from 'express';

import controller from '../controllers/user';

import passwordChecker from '../middlewares/password-check';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(1), controller.getUsers.bind(controller));
router.get('/:id', auth(), controller.getUser.bind(controller));
router.post('/signup', passwordChecker, controller.signup.bind(controller));
router.post('/login', controller.login.bind(controller));
router.patch('/:id', auth(), controller.updateUser.bind(controller));
router.delete('/:id', auth(), controller.deleteUser.bind(controller));
router.get('/:id/profile', auth(), controller.getUserProfile.bind(controller));

export default router;
