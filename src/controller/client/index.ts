import express from 'express';
import clientService from 'src/services/client/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { login, password } = req.body;

  const client = await clientService.insert({ login, password });
  if (!client) {
    res.status(400).json({ message: 'error while creating new client' });
  }
  res.json(client);
});

export default router;
