import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Order from '../models/Order';
import Sale from '../models/Sale';
import Customer from '../models/Customer';
import Product from '../models/Product';

interface ProductRequest {
  id: string;
  discount: number;
  quantity: number;
  unit_price: number;
}

class OrderController {
  public async list(request: Request, response: Response): Promise<Response> {
    const ordersRepository = getRepository(Order);
    const orders = await ordersRepository.find({
      relations: ['customer', 'sales', 'sales.order', 'sales.product'],
    });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOne(id, {
      relations: ['customer', 'sales', 'sales.order', 'sales.product'],
    });

    return response.json({ order });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const productsList: Array<ProductRequest> = products;

    const ordersRepository = getRepository(Order);
    const order = ordersRepository.create({
      customer_id,
      total: 0,
    });

    const customersRepository = getRepository(Customer);
    const customer = await customersRepository.findOne(customer_id);

    if (!customer) {
      return response.status(400).json({ error: 'Cliente não encontrado' });
    }

    await ordersRepository.save(order);

    const salesRepository = getRepository(Sale);

    let total = 0;
    const sales: Sale[] = [];

    await Promise.all(
      productsList.map(async ({ id, discount, quantity }) => {
        const productsRepository = getRepository(Product);
        const product = await productsRepository.findOne(id);

        if (!product) return null;

        const sale = salesRepository.create({
          order_id: order.id,
          product_id: id,
          discount,
          quantity,
        });

        sales.push(sale);

        total += (product.price - discount) * quantity - customer.discount;
        await salesRepository.save(sale);
        return sale;
      }),
    );

    order.total = total;
    order.sales = sales;

    await ordersRepository.save(order);

    return response.json(order);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { customer_id, products } = request.body;

    const ordersRepository = getRepository(Order);

    const order = await ordersRepository.findOne(id);

    if (!order) {
      return response.status(400).json({ Error: 'Pedido não encontrado' });
    }

    const productsList: Array<ProductRequest> = products;

    const salesRepository = getRepository(Sale);

    let total = 0;
    const sales: Sale[] = [];

    await Promise.all(
      productsList.map(
        async ({ id: productId, discount, quantity, unit_price }) => {
          let sale = await salesRepository.findOne({
            where: { product_id: productId },
          });
          if (!sale) {
            sale = salesRepository.create({
              order_id: id,
              product_id: productId,
              discount,
              quantity,
            });
          } else {
            sale.order_id = id;
            sale.product_id = productId;
            sale.discount = discount;
            sale.quantity = quantity;
          }
          await salesRepository.save(sale);
          total += (unit_price - discount) * quantity;
          sales.push(sale);
          return sale;
        },
      ),
    );

    order.total = total;
    order.customer_id = customer_id;
    order.sales = sales;

    await ordersRepository.save(order);

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ordersRepository = getRepository(Order);

    await ordersRepository.delete(id);

    return response.status(204).json();
  }
}

export default OrderController;
