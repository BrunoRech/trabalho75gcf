import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();

const customersController = new CustomersController();

customersRouter.get('/', customersController.list);
customersRouter.get('/:id', customersController.show);
customersRouter.post('/', customersController.create);
customersRouter.put('/:id', customersController.update);
customersRouter.delete('/:id', customersController.delete);

export default customersRouter;
