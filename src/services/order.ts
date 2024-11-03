import ClientRepository from 'src/repositories/client.js';
import OrderRepository from 'src/repositories/order.js';
import ProductRepository from 'src/repositories/product.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { NotFoundError } from 'src/util/errors/notFoundError.js';

export default class OrderService {
  static async insert(clientId: number, items: {productId: number, amount: number}[]) {
    if (items.length === 0) {
      throw new BadRequestError('empty itens list');
    }

    const client = await ClientRepository.getById(clientId);
    if (!client) {
      throw new NotFoundError('client not found');
    }

    let total = 0;
    const completeItems = await Promise.all(items.map(async (item) => {
      const product = await ProductRepository.getById(item.productId);
      if (product.stock < item.amount) {
        throw new BadRequestError(`insufficient items in stock: ${product.name} - ${product.stock}`);
      }
      await ProductRepository.update({
        id: product.id,
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        stock: product.stock - item.amount,
      });
      total += product.price * item.amount;
      return { ...item, productPrice: product.price };
    }));

    const newOrder = await OrderRepository.insert({ total, clientId: client.id, itens: completeItems });
    return newOrder;
  }

  static async list() {
    const orders = await OrderRepository.getAll();
    return orders;
  }

  static async getById(id: number) {
    const order = await OrderRepository.getById(id);
    if (!order) {
      throw new NotFoundError('order not found');
    }
    return order;
  }

  static async getByClientId(id: number) {
    const orders = await OrderRepository.getByClientId(id);
    return orders;
  }

  static async delete(id: number) {
    const order = await OrderRepository.getById(id);
    if (!order) {
      throw new NotFoundError('order not found');
    }
    await OrderRepository.deleteById(id);
  }
}
