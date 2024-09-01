import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StationValidation } from './station.validation';
import { StationControllers } from './station.controller';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-station',
  authValidation(USER_ROLE.admin),
  validateRequest(StationValidation.createStationSchema),
  StationControllers.createStation,
);

router.get('/', StationControllers.stationAllGet);

router.put(
  '/:id',
  authValidation(USER_ROLE.admin),
  validateRequest(StationValidation.updateStationSchema),
  StationControllers.updateStation,
);

export const StationRoutes = router;
