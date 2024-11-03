import { Client, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import prisma from 'src/db/index.js';

export class ClientRepository {
  #prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

  constructor(prismaClient: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this.#prisma = prismaClient;
  }

  async insert(client: Prisma.ClientCreateInput): Promise<Client | undefined> {
    try {
      return await this.#prisma.client.create({
        data: client,
      });
    } catch (err) {
      return undefined;
    }
  }
}

const clientRepository = new ClientRepository(prisma);
export default clientRepository;
