Deployment Journal - Inventory Management App
Obiettivo
Portare online un'applicazione Full Stack mantenendo lo stack originale:

React + Vite
Node.js + Express
MySQL
mysql2
JWT Authentication
L'obiettivo era migrare il database locale XAMPP verso un database cloud e deployare l'applicazione mantenendo l'architettura originale.

Architettura finale
Frontend (Vercel)
        ↓
Backend (Render)
        ↓
Database (Aiven MySQL)

Migrazione Database
Situazione iniziale
Database locale:

XAMPP
↓
MariaDB/MySQL locale
Backend:

Node.js + Express

Scelta del provider
Dopo aver valutato varie opzioni:

Aiven
Railway
PlanetScale
Oracle Cloud
è stato scelto:

Aiven MySQL Free Tier
Motivazioni:

compatibilità nativa MySQL
nessuna migrazione verso PostgreSQL
supporto mysql2
piano gratuito

Esportazione Database
Tramite phpMyAdmin:

inventario_db
↓
Export
↓
Quick
↓
SQL
File generato:

inventario_db.sql

Configurazione Aiven
Creazione istanza:

MySQL 8.4
Free Tier
1 CPU
1GB RAM
1GB Storage
Recupero credenziali:

Host
Porta
Username
Password
Database

Aggiornamento Backend
Aggiornamento file .env.

Sostituzione valori locali:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
con quelli forniti da Aiven.

Problema SSL
Aiven richiede SSL/TLS.

Configurazione temporanea:

ssl: {
  rejectUnauthorized: false
}
Risultato:

Connessione al database riuscita

Verifica Application Flow
Tentativo di login:

Errore ricevuto:

Table 'defaultdb.users' doesn't exist
Interpretazione:

✅ Frontend funzionante

✅ Backend funzionante

✅ Connessione database funzionante

✅ Query SQL funzionanti

❌ Tabelle assenti

Tentativi di importazione
MySQL Workbench
Problemi riscontrati:

configurazione SSL
Verify CA
Verify Identity
connessioni bloccate
Metodo abbandonato.

mysql.exe di XAMPP
Errore:

caching_sha2_password
Motivo:

Aiven MySQL 8
vs
Client MariaDB di XAMPP

Soluzione adottata
Installazione:

DBeaver Community
Configurazione:

Host Aiven
Porta
Utente
Password
Certificato CA
SSL
Connessione riuscita:

Connected
MySQL 8.4

Problema PRIMARY KEY
Errore:

sql_require_primary_key=ON
Motivo:

phpMyAdmin esportava:

CREATE TABLE ...
e solo successivamente:

ALTER TABLE ...
ADD PRIMARY KEY
Aiven richiede la PRIMARY KEY già nel CREATE TABLE.

Correzioni effettuate
Aggiunto:

PRIMARY KEY
all'interno dei:

CREATE TABLE
Aggiunto:

AUTO_INCREMENT
direttamente sulle colonne id.

Rimossi gli ALTER TABLE ridondanti.
Import completato
Tabelle importate:

users
products
categories
Dati migrati correttamente.

SSL Production Ready
Creata cartella:

backend/src/certificates
Aggiunto:

ca.pem
Configurazione finale:

ssl: {
  ca: fs.readFileSync('./src/certificates/ca.pem')
}

Deploy Backend
Provider: Render

Configurazione:

Root Directory: backend
Build Command: npm install
Start Command: npm start
Environment Variables:

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
JWT_SECRET

Problema durante il deploy
Errore:

getaddrinfo ENOTFOUND
Causa reale:

Database Aiven spento (Powered Off)
Risoluzione:

Riattivazione servizio Aiven
↓
Redeploy Render

Stato finale Backend
✅ Deploy completato

✅ API raggiungibile pubblicamente

✅ Database cloud collegato

✅ SSL funzionante

✅ Login funzionante

✅ Dashboard funzionante

✅ Prodotti caricati dal cloud


Deployment URLs
Backend
Provider: Render
URL: https://inventory-management-api-aa0x.onrender.com
Status: ✅ Online

Database
Provider: Aiven
Status: ✅ Running
Region: Europe

# Deployment URLs

## Frontend

https://inventory-management-app-seven-peach.vercel.app

## Backend

https://inventory-management-api-xxxx.onrender.com

## Database

Aiven MySQL

Status:
✅ Online

# Problemi risolti durante il deployment

## Vercel API URL

Problema:

Frontend tentava di chiamare:

http://localhost:5000/api

Causa:

Branch corretto ma variabile ambiente non configurata correttamente.

Soluzione:

Configurata:

VITE_API_URL=https://backend.onrender.com/api

## React Router Refresh

Problema:

Refresh su /dashboard generava 404.

Causa:

Vercel cercava un file fisico /dashboard.

Soluzione:

Creazione file vercel.json:

{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

## CORS Configuration

Problema:

Il backend inizialmente accettava richieste Cross-Origin senza restrizioni.

Rischio:

Consentire richieste da domini non autorizzati.

Soluzione:

Configurazione del middleware CORS limitando l'accesso al dominio Vercel:

```js
app.use(cors({
  origin: 'https://inventory-management-app-seven-peach.vercel.app'
}));