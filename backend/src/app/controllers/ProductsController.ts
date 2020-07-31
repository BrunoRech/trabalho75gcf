import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';

class ProductsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOne(id);

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { manufacturer, description } = request.body;

    const productsRepository = getRepository(Product);
    const product = productsRepository.create({
      manufacturer,
      description,
    });

    await productsRepository.save(product);

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { manufacturer, description } = request.body;

    const productsRepository = getRepository(Product);
    const product = await productsRepository.update(id, {
      manufacturer,
      description,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    await productsRepository.delete(id);

    return response.status(204).json();
  }
}

export default ProductsController;
