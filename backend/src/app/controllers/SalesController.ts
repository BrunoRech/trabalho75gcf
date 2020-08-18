import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Sale from '../models/Sale';

class SalesController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const salesRepository = getRepository(Sale);

    await salesRepository.delete(id);

    return response.status(204).json();
  }
}

export default SalesController;
