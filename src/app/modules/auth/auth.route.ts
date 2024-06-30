import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidationSchema } from './auth.validation';
import { UserValidation } from '../user/user.validation';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import { upload } from '../../utils/sendImageToCloudinary';
// import { parseJsonFromBody } from '../../middlewares/parseJsonFromBody';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserSchema),
  AuthControllers.signupUser,
);
// router.post(
//   '/signup',
//   upload.single('file'),
//   parseJsonFromBody,
//   validateRequest(UserValidation.createUserSchema),
//   authControllers.signupUser,
// );
router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  authValidation(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.user,
  ),
  validateRequest(AuthValidationSchema.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidationSchema.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidationSchema.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidationSchema.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);



export const AuthRoutes = router;
