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
      amount: 0,
    });

    await ordersRepository.save(order);

    const salesRepository = getRepository(Sale);

    let amount = 0;

    await Promise.all(
      productsList.map(async ({ id, discount, quantity, unit_price }) => {
        console.log({ order, id, discount, quantity, unit_price });

        const sale = salesRepository.create({
          order_id: order.id,
          product_id: id,
          discount,
          unit_price,
          quantity,
        });

        amount += unit_price * quantity;
        await salesRepository.save(sale);
        return sale;
      }),
    );

    order.amount = amount;

    await ordersRepository.save(order);

    return response.json(order);
  }
}

export default OrderController;
