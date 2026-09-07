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
router.get('/', getProducts);
router.get('/categories', getCategories);
//Rotte Protette (Richiedono JWT)
router.post('/', verifyToken, insertProduct);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, updateProductById);
router.delete('/:id', verifyToken, deleteProduct);

export default router;