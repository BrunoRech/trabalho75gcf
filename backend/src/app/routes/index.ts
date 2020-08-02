import { Router } from 'express';

import productsRoutes from './products.routes';
import customersRoutes from './customers.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/customers', customersRoutes);

export default routes;
