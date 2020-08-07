import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Order from '../models/Order';
import Sale from '../models/Sale';

interface ProductRequest {
  id: string;
  discount: number;
  quantity: number;
  unitPrice: number;
}

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const { clientId, products } = request.body;

    const productsList: Array<ProductRequest> = products;

    const ordersRepository = getRepository(Order);
    const order = ordersRepository.create({
      clientId,
    });

    const salesRepository = getRepository(Sale);

    let amount = 0;

    productsList.forEach(async ({ id, discount, quantity, unitPrice }) => {
      const sale = salesRepository.create({
        orderId: order.id,
        produtId: id,
        discount,
        quantity,
        unitPrice,
      });

      amount += unitPrice * quantity;

      return sale;
    });

    return response.json({ ...order, amount });
  }
}

export default OrderController;
