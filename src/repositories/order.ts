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

  static async getProductAmountInDateRange(
    startDate: string,
    endDate: string,
  ) {
    type Result = {
      productId: number,
      name: string,
      sum: bigint,
    }
    const result = (await prisma.$queryRaw`
      SELECT p.id as productId, p.name, SUM(oi.amount) as sum
      FROM "Order" o
      JOIN "OrderItem" oi on oi.orderId = o.id
      JOIN "Product" p on p.id = oi.productId
      WHERE o.creationDate BETWEEN ${startDate} AND ${endDate}
      GROUP BY p.id
      `) as Result[];
    return result.map((res) => ({ productId: res.productId, name: res.name, sum: Number(res.sum) }));
  }

  static async getProfitByDateRange(startDate: string, endDate: string) {
    const result = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        creationDate: {
          lte: new Date(endDate),
          gte: new Date(startDate),
        },
      },
    });
    return result;
  }
}
