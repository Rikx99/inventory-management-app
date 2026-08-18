import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// carica le variabili d'ambiente dal file .env
dotenv.config();

// crea una connessione al database MYSQL

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Numero massimo di connessioni contemporanee nel pool
    queueLimit: 0
});

// Funzione di test per verificare la connessione all'avvio
export const testConnection = async () => {
    try{
        const connection = await db.getConnection();
        console.log('Connessione al database riuscita');
        connection.release(); // Rilascia la connessione al pool
    } catch (error) {
        console.error('Errore di connessione al database:', error.message);
        process.exit(1); // Termina l'applicazione in caso di errore di connessione
    }
};

export default db;