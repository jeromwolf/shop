import express from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

export default router;
