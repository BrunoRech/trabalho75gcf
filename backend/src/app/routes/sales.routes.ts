import { Router } from 'express';
import SalesController from '../controllers/SalesController';

const salesRouter = Router();

const salesController = new SalesController();

salesRouter.delete('/:id', salesController.delete);

export default salesRouter;
