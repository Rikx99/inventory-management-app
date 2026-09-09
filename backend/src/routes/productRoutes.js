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
//Rotte Pubbliche
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/paginated', verifyToken, getProductsPaginated);
//Rotte Protette (Richiedono JWT)
router.post('/', verifyToken, insertProduct);
router.get('/:id', verifyToken, getProductById);
router.put('/:id', verifyToken, isAdmin, updateProductById);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;