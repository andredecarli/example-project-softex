import prisma from 'src/db/index.js';

export default class ProductRepository {
  static async insert(product: {name: string, price: number, categoryId: number}) {
    return prisma.product.create({ data: product });
  }

  static async getByName(name: string) {
    return prisma.product.findFirst({ where: { name }, include: { category: true } });
  }

  static async getAll() {
    return prisma.product.findMany({ include: { category: true } });
  }

  static async getById(id: number) {
    return prisma.product.findUnique({ where: { id }, include: { category: true } });
  }

  static async getByCategoryId(categoryId: number) {
    return prisma.product.findMany({ where: { categoryId }, include: { category: true } });
  }

  static async deleteById(id: number) {
    return prisma.product.delete({ where: { id } });
  }

  static async update(product: {id: number, name: string, price: number, categoryId: number}) {
    return prisma.product.update({
      where: {
        id: product.id,
      },
      data: product,
      include: {
        category: true,
      },
    });
  }
}
