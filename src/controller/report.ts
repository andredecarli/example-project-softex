import Router from 'express';
import ReportService from 'src/services/report.js';
import { BadRequestError } from 'src/util/errors/badRequestError.js';
import { handleErrors } from 'src/util/errors/handleErrors.js';

const router = Router();

router.get('/stock', async (req, res) => {
  try {
    const stock = await ReportService.listProductStock();
    res.json(stock);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/stock/category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const _id = Number(id);
    if (Number.isNaN(_id) || !Number.isInteger(_id)) {
      throw new BadRequestError('invalid category id');
    }

    const stock = await ReportService.listProductStockByCategory(_id);
    res.json(stock);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/sold-products', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      throw new BadRequestError('need startDate and endDate query params');
    }

    const result = await ReportService.listProductsSoldByDate(startDate as string, endDate as string);
    res.json(result);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

router.get('/sells', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      throw new BadRequestError('need startDate and endDate query params');
    }

    const result = await ReportService.listSellsByDate(startDate as string, endDate as string);
    res.json(result);
  } catch (error) {
    handleErrors(res, error);
    res.json({ message: error.message });
  }
});

export default router;
