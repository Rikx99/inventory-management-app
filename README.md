# Gestionale Inventario (Full Stack React + Node.js)

Applicazione gestionale per la gestione di prodotti, categorie e ordini.  
Progetto full‑stack sviluppato con **React**, **Node.js**, **Express** e **MySQL**.

---

## 🚀 Stato del progetto

### ✔️ Fase 1 — Completata

### ⏳ Fase 2 — In sviluppo

### ⏳ Fase 3 — In sviluppo

# Gestionale Inventario

Backend REST per la gestione di prodotti, categorie e utenti, sviluppato con Node.js, Express e MySQL. Il frontend React è previsto nella fase successiva.

## Stato del progetto

### Completato

- Struttura backend con Node.js ed Express
- Connessione a MySQL tramite `mysql2/promise`
- Configurazione tramite variabili d'ambiente con `dotenv`
- API di registrazione e login utenti
- Password cifrate con `bcryptjs`
- Autenticazione tramite JWT
- Middleware di verifica del token
- Autorizzazione per ruolo amministratore
- CRUD utenti riservato agli amministratori
- CRUD prodotti
- Recupero categorie
- Ricerca prodotti per titolo
- Filtro prodotti per categoria
- Script SQL per schema e dati di test
- Verifica della connessione al database all'avvio

### Verificato

- Avvio del server sulla porta `5000`
- Connessione al database funzionante
- Endpoint base funzionante
- Recupero prodotti e categorie verificato
- Sintassi JavaScript e import delle route verificati
- Hash bcrypt degli utenti demo corretto nel seed

### Prossimo passo

- Test completo delle rotte con Postman
- Creazione del frontend React
- Integrazione frontend-backend
- Pagine di login, prodotti e gestione utenti

## Tecnologie

### Backend

- Node.js
- Express
- MySQL
- `mysql2`
- `bcryptjs`
- `jsonwebtoken`
- `dotenv`
- `cors`

## Struttura principale

```text
gestionale-inventario/
├── backend/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
└── frontend/   # da creare
```

## Configurazione

Creare il file `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=la_tua_password
DB_NAME=inventario_db
DB_PORT=3306
PORT=5000
JWT_SECRET=una_chiave_lunga_e_casuale
```

Non committare il file `.env` nel repository.

## Installazione e avvio

Dal terminale:

```bash
cd backend
npm install
npm start
```

Per lo sviluppo con riavvio automatico:

```bash
npm run dev
```

Il server sarà disponibile su `http://localhost:5000`.

## Database e dati demo

Creare il database e applicare gli script SQL nell'ordine seguente:

```bash
mysql -u root -p inventario_db < db/schema.sql
mysql -u root -p inventario_db < db/seed.sql
```

Gli utenti demo utilizzano la password:

```text
password123
```

Account disponibili:

- `admin@inventario.it` con ruolo `admin`
- `mario.rossi@inventario.it` con ruolo `user`

## API principali

Base URL: `http://localhost:5000`

### Autenticazione

| Metodo | Endpoint | Accesso | Descrizione |
| --- | --- | --- | --- |
| `POST` | `/api/auth/registerUser` | Pubblico | Registra un utente |
| `POST` | `/api/auth/login` | Pubblico | Esegue il login e restituisce un JWT |
| `GET` | `/api/auth/me` | JWT | Verifica il token corrente |

### Prodotti e categorie

| Metodo | Endpoint | Accesso | Descrizione |
| --- | --- | --- | --- |
| `GET` | `/api/products` | Pubblico | Elenca i prodotti |
| `GET` | `/api/products?search=monitor` | Pubblico | Cerca per titolo |
| `GET` | `/api/products?category=Elettronica` | Pubblico | Filtra per categoria |
| `GET` | `/api/products/categories` | Pubblico | Elenca le categorie |
| `GET` | `/api/products/:id` | JWT | Recupera un prodotto |
| `POST` | `/api/products` | JWT | Crea un prodotto |
| `PUT` | `/api/products/:id` | JWT | Modifica un prodotto |
| `DELETE` | `/api/products/:id` | JWT | Elimina un prodotto |

### Utenti

Le rotte utenti richiedono un token JWT associato a un account con ruolo `admin`.

| Metodo | Endpoint | Descrizione |
| --- | --- | --- |
| `GET` | `/api/users` | Elenca gli utenti |
| `GET` | `/api/users/:id` | Recupera un utente |
| `POST` | `/api/users` | Crea un utente |
| `PUT` | `/api/users/:id` | Modifica un utente |
| `DELETE` | `/api/users/:id` | Elimina un utente |

Per le rotte protette inviare l'header:

```text
Authorization: Bearer IL_TUO_TOKEN
```

## Esempio di creazione prodotto

```json
{
	"title": "Nuovo prodotto",
	"description": "Descrizione del prodotto",
	"price": 25.90,
	"stock_quantity": 10,
	"category_id": 1
}
```

## Note di sicurezza

- Le password non vengono salvate in chiaro: sono cifrate con `bcryptjs`.
- Le query al database utilizzano parametri preparati.
- Il token JWT deve essere firmato con un valore segreto presente nelle variabili d'ambiente.
- In produzione utilizzare HTTPS, un `JWT_SECRET` casuale e un sistema di rate limiting per il login.
- Il token demo ha una durata limitata e non deve essere utilizzato in produzione.

## 📁 Struttura del progetto (attuale)

gestionale-inventario/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── index.js
│   ├── package.json
│   └── .env (non incluso)
│
└── frontend/ (non ancora creato)


---

## 🔧 Tecnologie utilizzate (attuali)

### Backend
- Node.js
- Express
- MySQL2
- dotenv
- cors

*(JWT, bcrypt, Auth, CRUD → saranno aggiunti nella Fase 2)*

---

## ⚙️ Setup ambiente

### Installazione dipendenze
```bash
npm install

Avvio del server
npm start

Variabili d'ambiente (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=la_tua_password
DB_NAME=inventario_db
DB_PORT=3306
PORT=5000

