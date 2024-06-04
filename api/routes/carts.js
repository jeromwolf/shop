import express from 'express';
import { getUserCart, createUserCartItems, updateUserCartItems, deleteUserCartItems } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getUserCart);
router.post('/:userId/items', createUserCartItems);
router.put('/:userId/items/:itemId', updateUserCartItems);
router.delete('/:userId/items/:itemId', deleteUserCartItems);

export default router;
