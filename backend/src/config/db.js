import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
// carica le variabili d'ambiente dal file .env
dotenv.config();

// crea una connessione al database MYSQL
/*const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        ca: 
        fs.readFileSync('./src/certificates/ca.pem')
    },
    waitForConnections: true,
    connectionLimit: 10, // Numero massimo di connessioni contemporanee nel pool
    queueLimit: 0
});
*/

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 15384,
    ssl: {
        ca:
        fs.readFileSync('./src/certificates/ca-postgresql.pem')
    },
    idleTimeoutMillis: 30000,
    max: 20,
    connectionTimeoutMillis: 2000
});
// Funzione di test per verificare la connessione all'avvio
/*export const testConnection = async () => {
    try{
        const connection = await db.getConnection();
        console.log('Connessione al database riuscita');
        connection.release(); // Rilascia la connessione al pool
    } catch (error) {
        console.error('Errore di connessione al database:', error.message);
        process.exit(1); // Termina l'applicazione in caso di errore di connessione
    }
};
*/
// Funzione di test per verificare la connessione al database PostgreSQL
export const testConnection = async () => {
    try{
    await db.query('SELECT $1::text as message', ['Connessione al database PostgreSQL riuscita']
    );
    console.log('Connessione al database PostgreSQL riuscita');
    } catch (error) {
        console.error(
            'Errore di conessione al database PosrgreSQL:',
             error.message
        );
    }
}

export default db;