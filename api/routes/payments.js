import express from 'express';
import { createPayment, getPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/:paymentId', getPayment);

export default router;
