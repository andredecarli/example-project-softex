import ProductRepository from 'src/repositories/product.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { NotFoundError } from 'src/util/errors/notFoundError.js';

export default class ProductService {
  static async insert(name: string, price: number, categoryId: number) {
    const product = await ProductRepository.getByName(name);
    if (product) {
      throw new BadRequestError('product already exists');
    }

    const newproduct = await ProductRepository.insert({ name, price, categoryId });
    return newproduct;
  }

  static async list() {
    const clients = await ProductRepository.getAll();
    return clients;
  }

  static async getById(id: number) {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new NotFoundError('product not found');
    }
    return product;
  }

  static async getByCategoryId(id: number) {
    const products = await ProductRepository.getByCategoryId(id);
    return products;
  }

  static async delete(id: number) {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new NotFoundError('product not found');
    }
    await ProductRepository.deleteById(id);
  }

  static async update(id: number, name: string, price: number, categoryId: number) {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new NotFoundError('product not found');
    }
    const updatedproduct = await ProductRepository.update({
      id, name, price, categoryId,
    });
    return updatedproduct;
  }
}
