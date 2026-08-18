# Gestionale Inventario (Full Stack React + Node.js)

Applicazione gestionale per la gestione di prodotti, categorie e ordini.  
Progetto full‑stack sviluppato con **React**, **Node.js**, **Express** e **MySQL**.

---

## 🚀 Stato del progetto

### ✔️ Fase 1 — Completata
- Setup backend con Express
- Connessione MySQL tramite mysql2/promise
- Gestione variabili d'ambiente con dotenv
- Test connessione database all'avvio
- Struttura iniziale del backend

### ⏳ Fase 2 — In sviluppo
- Implementazione API REST (Auth + CRUD Prodotti)
- Middleware JWT
- Controller e modelli

### ⏳ Fase 3 — In sviluppo
- Setup frontend React (Vite + Tailwind + shadcn/ui)
- Integrazione con backend
- Dashboard e viste principali

---

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

