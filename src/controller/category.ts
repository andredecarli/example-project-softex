import { Router } from 'express';
import CategoryService from 'src/services/category.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { handleErrors } from 'src/util/errors/handleErrors.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const category = await CategoryService.insert(name);
    res.status(201).json(category);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const category = await CategoryService.list();
    res.json(category);
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
      throw new BadRequestError('invalid category id');
    }

    const client = await CategoryService.getById(_id);
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
      throw new BadRequestError('invalid category id');
    }

    await CategoryService.delete(_id);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid category id');
    }

    const updated = await CategoryService.update(_id, name);
    res.json(updated);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

export default router;
