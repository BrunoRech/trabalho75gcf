import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Customer from '../models/Customer';

class CustomersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const customersRepository = getRepository(Customer);
    const customers = await customersRepository.find();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const customersRepository = getRepository(Customer);
    const customer = await customersRepository.findOne(id);

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      address,
      number,
      district,
      city,
      cep,
      state,
    } = request.body;

    const customersRepository = getRepository(Customer);
    const customer = customersRepository.create({
      name,
      cpf,
      address,
      number,
      district,
      city,
      cep,
      state,
    });

    await customersRepository.save(customer);

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      cpf,
      address,
      number,
      district,
      city,
      cep,
      state,
    } = request.body;

    const customersRepository = getRepository(Customer);
    const customer = await customersRepository.save({
      id,
      name,
      cpf,
      address,
      number,
      district,
      city,
      cep,
      state,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const customersRepository = getRepository(Customer);

    await customersRepository.delete(id);

    return response.status(204).json();
  }
}

export default CustomersController;
