import { Router } from 'express';
import ProductService from 'src/services/product.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { handleErrors } from 'src/util/errors/handleErrors.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;

    const product = await ProductService.insert(name, price, categoryId);
    res.status(201).json(product);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const product = await ProductService.list();
    res.json(product);
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

    const product = await ProductService.getById(_id);
    res.json(product);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/category/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid category id');
    }

    const products = await ProductService.getByCategoryId(_id);
    res.json(products);
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

    await ProductService.delete(_id);
    res.status(204).send();
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, categoryId } = req.body;

    // validação
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid product id');
    }

    const updated = await ProductService.update(_id, name, price, categoryId);
    res.json(updated);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

export default router;
