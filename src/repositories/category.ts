import prisma from 'src/db/index.js';

export default class CategoryRepository {
  static async insert(name: string) {
    return prisma.category.create({ data: { name } });
  }

  static async getByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  }

  static async getAll() {
    return prisma.category.findMany();
  }

  static async getById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  }

  static async deleteById(id: number) {
    return prisma.category.delete({ where: { id } });
  }

  static async update(category: {id: number, name: string}) {
    return prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
      },
    });
  }
}
