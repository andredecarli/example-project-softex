import { Client, Prisma } from '@prisma/client';
import clientRepository, { ClientRepository } from 'src/repositories/client/index.js';

export class ClientService {
  #clientRepository: ClientRepository;

  constructor(clientRep: ClientRepository) {
    this.#clientRepository = clientRep;
  }

  async insert(client: Prisma.ClientCreateInput): Promise<Client | undefined> {
    return this.#clientRepository.insert(client);
  }
}

const clientService = new ClientService(clientRepository);

export default clientService;
