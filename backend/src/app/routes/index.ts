import { Router } from 'express';

import productsRoutes from './products.routes';
import customersRoutes from './customers.routes';
import ordersRoutes from './orders.routes';
import salesRoutes from './sales.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/sales', salesRoutes);

export default routes;
