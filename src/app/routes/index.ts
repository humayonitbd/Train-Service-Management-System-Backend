import { Router } from 'express';
import { AdminRoute } from '../modules/admin/admin.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: AdminRoute,
  },
//   {
//     path: '/auth',
//     route: AuthRoute,
//   },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
