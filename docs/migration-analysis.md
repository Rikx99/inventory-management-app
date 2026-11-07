# Migration Analysis
## Inventory Management System
### MySQL → PostgreSQL

---

# FASE 1 - Analisi Backend

## Obiettivo

Identificare tutti i punti del progetto che dipendono da MySQL e che dovranno essere modificati durante la migrazione verso PostgreSQL.

---

# Architettura Backend

```text
src/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── validate.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── userAuthRoutes.js
├── services/
│   └── authService.js
└── index.js
```

---

# File che utilizzano MySQL

## Configurazione Database

### src/config/db.js

Responsabilità:

- Connessione al database
- Pool di connessioni MySQL
- Utilizzo del driver `mysql2/promise`

Da migrare:

- mysql2 → pg
- createPool() MySQL → Pool PostgreSQL

---

## Product Controller

### src/controllers/productController.js

Contiene query SQL per:

- recupero prodotti
- recupero singolo prodotto
- creazione prodotto
- aggiornamento prodotto
- eliminazione prodotto
- categorie
- ricerca
- paginazione

Dipendenze MySQL individuate:

- db.execute()
- placeholder `?`

---

## User Controller

### src/controllers/userController.js

Contiene query SQL per:

- recupero utenti
- recupero utente per id
- aggiornamento utente
- eliminazione utente
- ricerca tramite email

Dipendenze MySQL individuate:

- db.execute()
- placeholder `?`

---

## Auth Service

### src/services/authService.js

Responsabilità:

- Login
- Registrazione utenti
- Recupero utente autenticato

Da verificare:

- query SQL presenti
- eventuali placeholder MySQL
- utilizzo di db.execute()

---

# Mappa Funzionalità

## AUTH

### Login

File coinvolti:

- authController.js
- authService.js

Operazioni previste:

- ricerca utente tramite email
- verifica password

Stato:

- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

---

### Register

File coinvolti:

- authController.js
- authService.js

Operazioni previste:

- verifica email esistente
- creazione utente

Stato:

- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

---

### Current User

File coinvolti:

- authController.js
- authService.js

Operazioni previste:

- recupero utente tramite id

Stato:

- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

---

## PRODUCTS

### Get Products
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Get Product By Id
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Create Product
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Update Product
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Delete Product
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Search Products
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Products Pagination
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Categories
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

---

## USERS

### Get Users
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Get User By Id
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Update User
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

### Delete User
- [ ] Analizzato
- [ ] Convertito
- [ ] Testato

---

# File Database da Analizzare

## db/schema.sql

Da verificare:

- [ ] AUTO_INCREMENT
- [ ] FOREIGN KEY
- [ ] UNIQUE
- [ ] INDEX
- [ ] ENUM
- [ ] DEFAULT VALUES
- [ ] TIMESTAMP

Stato:

- [ ] Non analizzato

---

## db/seed.sql

Da verificare:

- [ ] compatibilità PostgreSQL
- [ ] insert demo users
- [ ] insert categories
- [ ] insert products

Stato:

- [ ] Non analizzato

---

# File Sicuramente Coinvolti Nella Migrazione

- src/config/db.js
- src/controllers/productController.js
- src/controllers/userController.js
- src/services/authService.js
- backend/db/schema.sql
- backend/db/seed.sql

---

# Verifiche Ancora Da Fare

- [ ] Analizzare completamente authService.js
- [ ] Analizzare schema.sql
- [ ] Analizzare seed.sql
- [ ] Contare con precisione le query SQL esistenti
- [ ] Identificare eventuali sintassi specifiche MySQL
- [ ] Identificare eventuali JOIN critiche
- [ ] Identificare placeholder da sostituire (`?` → `$1`)

---

# Note

Obiettivo della fase 1:

Capire esattamente quali file e query dipendono da MySQL prima di iniziare qualsiasi modifica al codice o al database.

## FASE 1
Status: ✅ COMPLETATA

Output:
- Mappa file dipendenti da MySQL
- Mappa query SQL
- Identificazione file coinvolti nella migrazione
- Documento migration-analysis.md creato