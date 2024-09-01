import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TicketValidation } from './ticket.validation';
import { TicketControllers } from './ticket.controller';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.post(
  '/',
  authValidation(USER_ROLE.user),
  validateRequest(TicketValidation.PurchaseTicketSchema),
  TicketControllers.purchaseTicket,
);

router.get('/', TicketControllers.getAllTicket);

export const TicketRoutes = router;
