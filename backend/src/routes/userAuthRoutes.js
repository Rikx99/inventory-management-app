import express from 'express';
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import {verifyToken} from '../middlewares/authMiddleware.js';
import { isAdmin} from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Rotte per la gestione degli utenti (protette da autenticazione a autorizazzione admin)
router.get('/', verifyToken, isAdmin, getUsers);
router.get('/:id', verifyToken, isAdmin, getUserById);
router.post('/', verifyToken, isAdmin, createUser);
router.put('/:id', verifyToken, isAdmin, updateUser);
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;