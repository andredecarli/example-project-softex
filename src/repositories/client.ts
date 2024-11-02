import prisma from 'src/db/index.js';

export default class ClientRepository {
  static async insert(client: {login: string, password: string }) {
    return prisma.client.create({ data: client });
  }

  static async getByLogin(login: string) {
    return prisma.client.findUnique({ where: { login } });
  }

  static async getAll() {
    return prisma.client.findMany();
  }

  static async getById(id: number) {
    return prisma.client.findUnique({ where: { id } });
  }

  static async deleteById(id: number) {
    return prisma.client.delete({ where: { id } });
  }

  static async update(client: {id: number, login: string, password: string}) {
    return prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        login: client.login,
        password: client.password,
      },
    });
  }
}
