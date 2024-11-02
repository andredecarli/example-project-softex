import express from 'express';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { handleErrors } from 'src/util/errors/handleErrors.js';
import ClientService from 'src/services/client/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    // validação
    if (!login || !password) {
      throw new BadRequestError('fields must include login and password');
    } else if (!(typeof login === 'string')) {
      throw new BadRequestError('login must be a string');
    } else if (!(typeof password === 'string')) {
      throw new BadRequestError('password must be a string');
    }

    const client = await ClientService.insert(login, password);
    res.status(201).json(client);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/', async (_, res) => {
  try {
    const clients = await ClientService.list();
    res.json(clients);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid client id');
    }

    const client = await ClientService.getById(_id);
    res.json(client);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid client id');
    }

    await ClientService.delete(_id);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password } = req.body;

    // validação
    if (!login || !password) {
      throw new BadRequestError('fields must include login and password');
    } else if (!(typeof login === 'string')) {
      throw new BadRequestError('login must be a string');
    } else if (!(typeof password === 'string')) {
      throw new BadRequestError('password must be a string');
    }

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid client id');
    }

    await ClientService.update(_id, login, password);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

// Opcional - Autenticação
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    // validação
    if (!login || !password) {
      throw new BadRequestError('fields must include login and password');
    } else if (!(typeof login === 'string')) {
      throw new BadRequestError('login must be a string');
    } else if (!(typeof password === 'string')) {
      throw new BadRequestError('password must be a string');
    }

    const client = await ClientService.auth(login, password);
    res.json(client);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

export default router;
