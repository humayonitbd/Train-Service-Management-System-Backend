import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TrainValidation } from './train.validation';
import { TrainControllers } from './train.controller';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-train',
  authValidation(USER_ROLE.admin),
  validateRequest(TrainValidation.CreateTrainSchema),
  TrainControllers.createTrain,
);

router.get('/', TrainControllers.TrainAllGet);

router.put(
  '/:id',
  authValidation(USER_ROLE.admin),
  validateRequest(TrainValidation.updateTrainSchema),
  TrainControllers.updateTrain,
);

export const TrainRoutes = router;
