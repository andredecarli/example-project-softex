import prisma from 'src/db/index.js';

export default class ClientRepository {
  static async insert(client: {login: string, password: string }) {
    return prisma.client.create({ data: client });
  }

  static async getByLogin(login: string) {
    return prisma.client.findUnique({ where: { login }, select: { id: true, login: true } });
  }

  static async getPasswordById(id: number) {
    return prisma.client.findUnique({ where: { id }, select: { password: true } });
  }

  static async getAll() {
    return prisma.client.findMany({ select: { id: true, login: true } });
  }

  static async getById(id: number) {
    return prisma.client.findUnique({ where: { id }, select: { id: true, login: true } });
  }

  static async deleteById(id: number) {
    return prisma.client.delete({ where: { id } });
  }

  static async update(client: {id: number, login: string, password: string}) {
    return prisma.client.update({
      where: {
        id: client.id,
      },
      data: client,
      select: {
        id: true,
        login: true,
      },
    });
  }
}
