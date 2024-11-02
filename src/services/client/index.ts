import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { NotFoundError } from 'src/util/errors/notFoundError.js';
import ClientRepository from 'src/repositories/client/index.js';
import { UnauthorizedError } from 'src/util/errors/unauthorizedError.js';
import bcrypt from 'bcrypt';

export default class ClientService {
  static async insert(login: string, password: string) {
    const client = await ClientRepository.getByLogin(login);
    if (client) {
      throw new BadRequestError('client already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await ClientRepository.insert({ login, password: hashedPassword });
    return { id: newClient.id, login: newClient.login };
  }

  static async list() {
    const clients = await ClientRepository.getAll();
    return clients.map((client) => ({ id: client.id, login: client.login }));
  }

  static async getById(id: number) {
    const client = await ClientRepository.getById(id);
    if (!client) {
      throw new NotFoundError('client not found');
    }
    return { id: client.id, login: client.login };
  }

  static async delete(id: number) {
    const client = await ClientRepository.getById(id);
    if (!client) {
      throw new NotFoundError('client not found');
    }
    await ClientRepository.deleteById(id);
  }

  static async update(id: number, login: string, password: string) {
    const client = await ClientRepository.getById(id);
    if (!client) {
      throw new NotFoundError('client not found');
    }
    const newPassword = await bcrypt.hash(password, 10);
    await ClientRepository.update({ id, login, password: newPassword });
  }

  static async auth(login: string, password: string) {
    const client = await ClientRepository.getByLogin(login);
    if (!client || (!await bcrypt.compare(password, client.password))) {
      throw new UnauthorizedError('wrong credentials');
    }
    return { id: client.id, login: client.login };
  }
}
