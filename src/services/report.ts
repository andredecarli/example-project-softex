import OrderRepository from 'src/repositories/order.js';
import ProductRepository from 'src/repositories/product.js';

export default class ReportService {
  static async listProductStock() {
    const products = await ProductRepository.getAll();
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      stock: product.stock,
      categoryId: product.categoryId,
    }));
  }

  static async listProductStockByCategory(id: number) {
    const products = await ProductRepository.getByCategoryId(id);
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      stock: product.stock,
      categoryId: product.categoryId,
    }));
  }

  static async listProductsSoldByDate(startDate: string, endDate: string) {
    const result = await OrderRepository.getProductAmountInDateRange(startDate, endDate);
    return result;
  }

  static async listSellsByDate(startDate: string, endDate: string) {
    const result = await OrderRepository.getProfitByDateRange(startDate, endDate);
    return result;
  }
}
