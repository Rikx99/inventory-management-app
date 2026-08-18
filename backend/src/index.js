import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db, { testConnection } from './config/db.js';

// carica le variabili d'ambiente dal file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Api Gestionale Inventario Attive!'});
});

// Avvio del server e verifica del DB
app.listen(PORT, async () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
    await testConnection(); // Verifica la connessione al database all'avvio
});
