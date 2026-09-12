import express from 'express';
import {
    getProducts,
    getProductsPaginated,
    insertProduct,
    getProductById,
    updateProductById,
    deleteProduct,
    getCategories
} from '../controllers/productController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/adminMiddleware.js';

const router = express.Router();
//Rotte di Consultazione (Accessibili sia agli User che ad ADMIN con Token)
router.get('/', verifyToken, getProducts);
router.get('/categories', verifyToken, getCategories);
router.get('/paginated', verifyToken, getProductsPaginated);
router.get('/:id', verifyToken, getProductById);
//Rotte Protette DI SCRITTURA/MODIFICA solo ADMIN (Richiedono JWT)
router.post('/', verifyToken, isAdmin, insertProduct);
router.patch('/:id', verifyToken, isAdmin, updateProductById);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;