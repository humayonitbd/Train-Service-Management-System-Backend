import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  AdminControllers.createAdmin,
);
router.get('/', AdminControllers.getAllAdmin);
router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidations.updateCreateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

export const AdminRoute = router;
