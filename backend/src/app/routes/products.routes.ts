import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  return res.json('get');
});
productsRouter.get('/:id', (req, res) => {
  return res.json('get');
});
productsRouter.post('/', (req, res) => {
  return res.json('post');
});
productsRouter.put('/:id', (req, res) => {
  return res.json('put');
});
productsRouter.delete('/:id', (req, res) => {
  return res.json('delete');
});

export default productsRouter;
