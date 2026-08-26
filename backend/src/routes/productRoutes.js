import express from 'express';
import {
    getProducts,
    createProduct,
    deleteProduct,
    getCategories
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

//Rotte Pubbliche
router.get('/products', getProducts);
router.get('/categories', getCategories);

//Rotte Protette (Richiedono JWT)
router.get('/products', verifyToken, createProduct);
router.get('/products/id:', verifyToken, deleteProduct);

export default router;