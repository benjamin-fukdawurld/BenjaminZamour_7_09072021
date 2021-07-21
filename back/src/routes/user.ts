import { Router } from 'express';

import controller from '../controllers/user';
import passwordChecker from '../middlewares/password-check';

const router = Router();

router.get('/', controller.getUsers.bind(controller));
router.get('/:id', controller.getUser.bind(controller));
router.post('/signup', passwordChecker, controller.signup.bind(controller));
router.post('/login', controller.login.bind(controller));
router.patch('/', controller.updateUser.bind(controller));
router.delete('/:id', controller.deleteUser.bind(controller));
router.get('/:id/profile', controller.getUserProfile.bind(controller));

export default router;
