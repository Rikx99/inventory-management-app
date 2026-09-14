# Gestionale Inventario

Backend REST per la gestione di prodotti, utenti e autorizzazioni, sviluppato con Node.js, Express e MySQL.

## Stato del progetto

### ✅ Backend completato

- registrazione e login utenti
- autenticazione JWT
- controllo token e sessione utente
- autorizzazione admin
- CRUD prodotti
- CRUD utenti riservato agli admin
- ricerca e filtro prodotti
- paginazione dei prodotti
- validazione input con Zod
- script SQL per schema e dati demo
- verifica connessione database all'avvio

### ✅ Verifiche eseguite

- avvio del server sulla porta `5000`
- connessione al database MySQL
- autenticazione e recupero dati utente loggato
- registrazione e login con password hashata
- accesso ai prodotti e categorie
- CRUD prodotti
- CRUD utenti con ruoli admin/user
- protezione di rotte admin
- completamento test delle API principali

### 🔜 Prossimo step

- creazione del frontend React
- integrazione frontend-backend
- gestione UI per login, prodotti e utenti
- eventuale dashboard amministrativa

---

## Tecnologie utilizzate

### Backend

- Node.js
- Express
- MySQL
- mysql2
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- zod

---

## Struttura del progetto

```text
gestionale-inventario/
├── backend/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── userController.js
│   │   ├── middlewares/
│   │   │   ├── adminMiddleware.js
│   │   │   ├── authMiddleware.js
│   │   │   └── validate.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── userAuthRoutes.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md
```

> Il file `.env` non va committato nella repository.

---

## Setup ambiente

### 1) Installazione dipendenze

```bash
cd backend
npm install
```

### 2) Configurazione variabili d'ambiente

Crea un file `.env` dentro `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=la_tua_password
DB_NAME=nome_db
DB_PORT=3306
PORT=5000
JWT_SECRET=una_chiave_segretissima_e_casuale
```

### 3) Avvio del server

```bash
cd backend
npm start
```

Per sviluppo con riavvio automatico:

```bash
cd backend
npm run dev
```

Il backend sarà disponibile all'indirizzo:

```text
http://localhost:5000
```

---

## Database e dati demo

Crea il database e applica gli script SQL nell'ordine corretto:

```bash
mysql -u root -p inventario_db < db/schema.sql
mysql -u root -p inventario_db < db/seed.sql
```

### Credenziali demo

Password di tutti gli utenti demo:

password123

Account presenti nel seed:

- `admin@inventario.it` → ruolo `admin`
- `mario.rossi@inventario.it` → ruolo `user`

---

## API REST

Base URL: http://localhost:5000

### Header autenticazione

Tutte le route protette richiedono:

```http
Authorization: Bearer <token>
```

### Autenticazione

| Metodo | Endpoint | Accesso | Descrizione |
| --- | --- | --- | --- |
| `POST` | `/api/auth/registerUser` | Pubblico | Registra un nuovo utente |
| `POST` | `/api/auth/login` | Pubblico | Effettua il login e restituisce il JWT |
| `GET` | `/api/auth/me` | JWT | Verifica il token e restituisce i dati utente |

### Prodotti

Le rotte di prodotto richiedono un token valido; la scrittura e la modifica sono riservate agli admin.

| Metodo | Endpoint | Accesso | Descrizione |
| --- | --- | --- | --- |
| `GET` | `/api/products` | JWT | Elenca tutti i prodotti |
| `GET` | `/api/products?search=monitor` | JWT | Cerca prodotti per titolo |
| `GET` | `/api/products?category=Elettronica` | JWT | Filtra prodotti per categoria |
| `GET` | `/api/products/categories` | JWT | Elenca le categorie disponibili |
| `GET` | `/api/products/paginated?page=1&limit=10` | JWT | Lista paginata dei prodotti |
| `GET` | `/api/products/:id` | JWT | Recupera un prodotto per ID |
| `POST` | `/api/products` | Admin | Crea un nuovo prodotto |
| `PATCH` | `/api/products/:id` | Admin | Aggiorna un prodotto |
| `DELETE` | `/api/products/:id` | Admin | Elimina un prodotto |

### Utenti

Le rotte utente richiedono autorizzazione admin.

| Metodo | Endpoint | Accesso | Descrizione |
| --- | --- | --- | --- |
| `GET` | `/api/users` | Admin | Elenca tutti gli utenti |
| `GET` | `/api/users/:id` | Admin | Recupera un utente per ID |
| `POST` | `/api/users` | Admin | Crea un utente |
| `PATCH` | `/api/users/:id` | Admin | Aggiorna un utente |
| `DELETE` | `/api/users/:id` | Admin | Elimina un utente |

---

## Esempi di payload

### Registro utente

```json
{
  "username": "nuovo_utente",
  "email": "nuovo@inventario.it",
  "password": "password123"
}
```

### Login

```json
{
  "email": "admin@inventario.it",
  "password": "password123"
}
```

### Creazione prodotto

```json
{
  "title": "Nuovo prodotto",
  "description": "Descrizione del prodotto",
  "price": 25.9,
  "stock_quantity": 10,
  "category_id": 1
}
```

### Aggiornamento prodotto con PATCH

```json
{
  "price": 29.99,
  "stock_quantity": 15
}
```

### Aggiornamento utente con PATCH

```json
{
  "role": "admin",
  "email": "nuovo@email.it"
}
```

---

## Validazione e sicurezza

- le password vengono salvate in modo sicuro con `bcryptjs`
- il token JWT viene generato con `jsonwebtoken`
- il middleware `verifyToken` controlla la presenza e la validità del token
- il middleware `isAdmin` limita le operazioni sensibili agli admin
- i dati in input vengono validati con `zod`
- gli endpoint prendono parametri SQL in modo sicuro tramite prepared statements

---

## Note finali

Questa repository attualmente contiene il backend completo del gestionale. Il frontend React non è ancora stato implementato, ma la base API è pronta per essere collegata a una UI client-side.

Il progetto è strutturato per essere esteso con pagine di login, dashboard gestione prodotti, gestione utenti e report di inventario.

