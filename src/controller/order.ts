import { Router } from 'express';
import OrderService from 'src/services/order.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { handleErrors } from 'src/util/errors/handleErrors.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { clientId, items } = req.body;

    const order = await OrderService.insert(clientId, items);
    res.status(201).json(order);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const order = await OrderService.list();
    res.json(order);
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
      throw new BadRequestError('invalid product id');
    }

    const order = await OrderService.getById(_id);
    res.json(order);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/client/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid client id');
    }

    const order = await OrderService.getByClientId(_id);
    res.json(order);
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
      throw new BadRequestError('invalid product id');
    }

    await OrderService.delete(_id);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

export default router;
