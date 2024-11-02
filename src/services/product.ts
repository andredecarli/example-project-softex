import ProductRepository from 'src/repositories/product.js';
import { NotFoundError } from 'src/util/errors/notFoundError.js';

export default class ProductService {
  static async insert(name: string, price: number, categoryId: number, stock: number) {
    const newProduct = await ProductRepository.insert({
      name, price, categoryId, stock,
    });
    return newProduct;
  }

  static async list() {
    const products = await ProductRepository.getAll();
    return products;
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

  static async update(id: number, name: string, price: number, categoryId: number, stock: number) {
    const product = await ProductRepository.getById(id);
    if (!product) {
      throw new NotFoundError('product not found');
    }
    const updatedProduct = await ProductRepository.update({
      id, name, price, categoryId, stock,
    });
    return updatedProduct;
  }
}
