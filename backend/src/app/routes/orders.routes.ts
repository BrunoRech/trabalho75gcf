import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const ordersRouter = Router();

const orderController = new OrderController();

ordersRouter.get('/', orderController.list);
ordersRouter.get('/:id', orderController.show);
ordersRouter.post('/', orderController.create);
ordersRouter.put('/:id', orderController.update);
ordersRouter.delete('/:id', orderController.delete);

export default ordersRouter;
