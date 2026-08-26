import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js'

// carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Registrazione Rotte API
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes)

// Rotta base di test
app.get('/', (req, res) => {
    res.json({ message: 'Api Gestionale Inventario Attive!'});
});

// Avvio del server e verifica del DB
app.listen(PORT, async () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
    await testConnection(); // Verifica la connessione al database all'avvio
});
