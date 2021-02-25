import { CUSTOMERS, ORDERS, ORDER_PRODUCTS, PRODUCTS } from './headerNames';
import { customers, orderProducts, orders, products } from './headers';

export const getColumns = header => {
  switch (header) {
    case ORDERS:
      return orders;
    case PRODUCTS:
      return products;
    case CUSTOMERS:
      return customers;
    case ORDER_PRODUCTS:
      return orderProducts;
    default:
      return null;
  }
};
