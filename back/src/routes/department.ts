import { Router } from 'express';

import controller from '../controllers/department';

import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth(), controller.getDepartments.bind(controller));
router.get('/:id', auth(), controller.getDepartment.bind(controller));
router.post('/', auth(1), controller.addDepartment.bind(controller));
router.put('/:id', auth(1), controller.updateDepartment.bind(controller));
router.delete('/:id', auth(1), controller.deleteDepartment.bind(controller));

export default router;
