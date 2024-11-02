import prisma from 'src/db/index.js';

interface Order {
  total: number,
  clientId: number,
  itens: {
    amount: number,
    productId: number,
    productPrice: number,
  }[]
}

export default class OrderRepository {
  static async insert(order: Order) {
    return prisma.order.create({
      data: {
        total: order.total,
        clientId: order.clientId,
        itens: {
          create: order.itens,
        },
      },
      include: {
        itens: true,
      },
    });
  }

  static async getAll() {
    return prisma.order.findMany({
      include: {
        client: {
          select: { id: true, login: true },
        },
        itens: true,
      },
    });
  }

  static async getById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        client: {
          select: { id: true, login: true },
        },
        itens: true,
      },
    });
  }

  static async getByClientId(clientId: number) {
    return prisma.order.findMany({
      where: { clientId },
      include: {
        client: {
          select: { id: true, login: true },
        },
        itens: true,
      },
    });
  }

  static async deleteById(id: number) {
    return prisma.order.delete({ where: { id } });
  }
}
