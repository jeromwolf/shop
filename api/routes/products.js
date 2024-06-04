import express from 'express';
import { getAllProducts, getCategoriesProducts, getIDProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/categories/:catename', getCategoriesProducts);

router.get('/:id', getIDProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
