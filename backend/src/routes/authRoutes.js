import express from 'express';
import {registerUser, login} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { validate, registerSchema, loginSchema } from '../middlewares/validate.js';

const router = express.Router();

router.post('/registerUser', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), login);
// Rotta per verificare la validità del token e recuperare l'utente connesso
router.get('/me', verifyToken, (req, res) => {
    res.json({user: req.user});
});

export default router;