import express from 'express';
import {
    getProducts,
    insertProduct,
    getProductById,
    updateProductById,
    deleteProduct,
    getCategories
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
//Rotte Pubbliche
router.get('/products', getProducts);
router.get('/categories', getCategories);
//Rotte Protette (Richiedono JWT)
router.post('/products', verifyToken, insertProduct);
router.get('/products/:id', verifyToken, getProductById);
router.put('/products/:id', verifyToken, updateProductById);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;