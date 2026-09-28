# Gestionale Inventario

Applicazione per la gestione di prodotti, utenti e autorizzazioni, composta da un backend REST Node.js/Express con database MySQL e da un frontend React in fase di sviluppo.

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

### 🚧 Frontend in sviluppo

- progetto React configurato con Vite
- form di login e registrazione con React Hook Form e Zod 4
- pagina di login collegata al form
- componenti UI di base configurati con shadcn/ui e Radix UI
- client HTTP Axios predisposto per comunicare con il backend
- routing e pagine protette in fase di completamento

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

- completamento del routing e della pagina di registrazione
- completamento della dashboard e delle pagine admin
- verifica dei flussi frontend-backend
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

### Frontend

- React e Vite
- React Router
- Tailwind CSS
- shadcn/ui e Radix UI
- React Hook Form e Zod
- Axios
- Zustand

---

## Struttura del progetto

```text
gestionale-inventario/
├── backend/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.sql
│   │── postman/
│   │   └── progetto-gestionale-inventario.postman_collection.json
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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── lib/
│   │   │   └── httpClient.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── routes/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
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

### 4) Avvio del frontend

In un secondo terminale, dalla cartella `frontend/`, installa le dipendenze e avvia Vite:

```bash
cd frontend
npm install
npm run dev
```

Vite mostrerà nel terminale l'indirizzo locale del frontend. Il client HTTP è attualmente configurato per raggiungere il backend su `http://localhost:5000/api`; assicurati quindi che il server e il database siano attivi.

Il frontend è ancora in sviluppo: alcune route in `App.jsx` fanno riferimento a pagine non ancora implementate, quindi l'applicazione non è ancora completa.

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
## 🧪 Testing con Postman

Nella repository è inclusa una collection Postman pronta all'uso per testare tutte le rotte API.

### Come importare ed usare la collection:
1. Apri **Postman** e clicca su **Import**.
2. Seleziona il file `backend/postman/gestionale-inventory.postman_collection.json`.
3. Assicurati che il server backend sia avviato su `http://localhost:5000`.
4. **Autenticazione:**
   - Esegui la chiamata `POST /api/auth/login` con le credenziali demo admin.
   - Copia il token JWT presente nel body della risposta.
   - Clicca sulla radice della Collection in Postman, apri la scheda **Variables** e incolla il token nel campo `authToken`.
5. **Path Variables:** Per le chiamate che richiedono un ID (es. `GET /api/products/:id`), inserisci l'ID desiderato nella scheda **Params** -> **Path Variables**.

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

Il backend e le API principali sono completati. Il frontend React è stato avviato e include i form di autenticazione e una prima pagina di login; routing, registrazione e viste per la gestione di prodotti e utenti sono ancora in sviluppo.

