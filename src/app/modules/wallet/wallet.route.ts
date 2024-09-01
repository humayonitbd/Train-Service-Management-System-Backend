import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { WalletValidation } from './wallet.validation';
import { WalletControllers } from './wallet.controller';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/add-wallet',
  authValidation(USER_ROLE.user),
  validateRequest(WalletValidation.addWalletSchema),
  WalletControllers.addWallet,
);

router.get('/', WalletControllers.getAllWallet);


export const WalletRoutes = router;
