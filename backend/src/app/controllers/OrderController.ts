import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Order from '../models/Order';
import Sale from '../models/Sale';

interface ProductRequest {
  id: string;
  discount: number;
  quantity: number;
  unit_price: number;
}

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const productsList: Array<ProductRequest> = products;

    const ordersRepository = getRepository(Order);
    const order = ordersRepository.create({
      customer_id,
    });

    const salesRepository = getRepository(Sale);

    let amount = 0;

    productsList.forEach(async ({ id, discount, quantity, unit_price }) => {
      const sale = salesRepository.create({
        order_id: order.id,
        product_id: id,
        discount,
        unit_price,
      });

      amount += unit_price * quantity;

      return sale;
    });

    return response.json({ ...order, amount });
  }
}

export default OrderController;
