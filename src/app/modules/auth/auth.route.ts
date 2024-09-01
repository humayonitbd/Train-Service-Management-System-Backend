import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchema } from './auth.validation';
import { UserValidation } from '../user/user.validation';



const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserSchema),
  AuthControllers.signupUser,
);

router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.loginUser,
);


export const AuthRoutes = router;
