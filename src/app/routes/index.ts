import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { StationRoutes } from '../modules/station/station.route';
import { TrainRoutes } from '../modules/train/train.route';
import { WalletRoutes } from '../modules/wallet/wallet.route';
import { TicketRoutes } from '../modules/ticket/ticket.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/station',
    route: StationRoutes,
  },
  {
    path: '/train',
    route: TrainRoutes,
  },
  {
    path: '/wallet',
    route: WalletRoutes,
  },
  {
    path: '/ticket',
    route: TicketRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
