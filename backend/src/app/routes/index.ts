import { Router } from 'express';

import productsRoutes from './products.routes';
import customersRoutes from './customers.routes';
import ordersRoutes from './orders.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/customers', customersRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
