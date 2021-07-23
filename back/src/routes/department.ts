import { Router } from 'express';

import controller from '../controllers/department';

const router = Router();

router.get('/', controller.getDepartments.bind(controller));
router.get('/:id', controller.getDepartment.bind(controller));
router.post('/', controller.addDepartment.bind(controller));
router.put('/', controller.updateDepartment.bind(controller));
router.delete('/:id', controller.deleteDepartment.bind(controller));

export default router;
