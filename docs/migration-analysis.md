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

Data : 07/11/2026

Output:
- Mappa file dipendenti da MySQL
- Mappa query SQL
- Identificazione file coinvolti nella migrazione
- Documento migration-analysis.md creato

# FASE 2 - Backup Database

Status: ✅ COMPLETATA

Data : 07/11/2026

Motivazione:
## Backup Aiven
- Backup automatici attivi
- Full backup giornalieri disponibili
- Ultimo backup verificato: 6 Nov 2026
- schema.sql presente in repository.
- seed.sql presente in repository.
- Database utilizzato esclusivamente per sviluppo e portfolio.
- Non sono presenti dati critici da preservare.

Decisione:

Per la migrazione verranno utilizzati schema.sql e seed.sql come fonte principale per la ricostruzione del database PostgreSQL.

# FASE 3 - Analisi schema.sql

Status: ✅ COMPLETATA

Data: xx/xx/xxxx

Risultati:

- Tabelle individuate: 3
- Foreign Keys: 2
- Complessità stimata: Semplice
- Relazioni:
  - Categories (1:N) Products
  - Users (1:N) Products

Elementi MySQL-specifici individuati:

- AUTO_INCREMENT (3)
- ENUM role
- ON UPDATE CURRENT_TIMESTAMP

Elementi NON presenti:

- ENGINE
- CHARSET
- COLLATE
- UNSIGNED
- Stored Procedures
- Trigger

Decisioni future:

- AUTO_INCREMENT → SERIAL
- ENUM role → valutare VARCHAR + CHECK
- updated_at → gestione applicativa oppure trigger PostgreSQL

Conclusione:

Lo schema del database non rappresenta un ostacolo significativo alla migrazione verso PostgreSQL.
La complessità principale sarà l'aggiornamento del backend Node.js e delle query SQL.

# FASE 4 - Analisi seed.sql

Status: ✅ COMPLETATA

Data: xx/xx/xxxx

Risultati:

- Tabelle popolate: 3
- Record totali: 13
- Complessità: Semplice

Tabelle:

- users (2 record)
- categories (3 record)
- products (8 record)

Compatibilità PostgreSQL:

✅ INSERT compatibili

✅ Nessuna funzione MySQL negli INSERT

✅ Ordine popolamento corretto

Punti da verificare:

- SET FOREIGN_KEY_CHECKS
- Gestione ID automatici
- Allineamento foreign key durante la migrazione

Conclusione:

Il file seed.sql non rappresenta un ostacolo significativo alla migrazione PostgreSQL.

# FASE 5 - Preparazione Ambiente PostgreSQL

Status: ✅ COMPLETATA

Service Name:
rikx-inventory-postgres-rbarchi09-ab2d

Version:
PostgreSQL 18

Hosting:
Aiven

Cloud Provider:
DigitalOcean

Region:
AMS (Amsterdam)

Connection Data:

Database:
defaultdb

Host:
rikx-inventory-postgres-rbarchi09-ab2d.c.aivencloud.com

Port:
15384

User:
avnadmin

SSL:
require

Notes:
Password conservata in Aiven e non salvata nel repository.
# FASE 6 - Verifica connessione PostgreSQL

## Obiettivo

Verificare che il nuovo database PostgreSQL creato su Aiven sia raggiungibile e pronto per la migrazione.

## Attività eseguite

- [x] Creato servizio PostgreSQL su Aiven
- [x] Recuperate credenziali di connessione
- [x] Installato/configurato driver PostgreSQL in DBeaver
- [x] Configurata connessione al database
- [x] Verificata connessione tramite DBeaver
- [x] Verificato accesso al database `defaultdb`
- [x] Verificata presenza dello schema `public`

## Ambiente

Provider: Aiven

Database Engine: PostgreSQL 18

Client utilizzato: DBeaver Community

SSL: require

## Risultato

Connessione stabilita con successo.

Database PostgreSQL raggiungibile e operativo.

Lo schema predefinito `public` è disponibile e pronto per la creazione delle tabelle applicative.

## Note

Nessuna modifica effettuata al backend Node.js.

Nessuna modifica effettuata alle variabili ambiente esistenti.

La connessione MySQL attuale rimane attiva e funzionante.

## Stato

✅ COMPLETATA

FASE 7.1 - Revisione modello dati
## Decisioni progettuali emerse durante la migrazione

### products.created_by

Situazione originale:
ON DELETE CASCADE

Problema:
L'eliminazione di un utente comporta l'eliminazione di tutti i prodotti creati.

Valutazione:
Comportamento non desiderato.

Esempio di scenario reale:
L'uscita di un dipendente dall'azienda non deve causare la perdita dei dati aziendali.

Decisione:
Da modificare durante la migrazione PostgreSQL.

### Revisione products.created_by

Situazione MySQL:
ON DELETE CASCADE

Problema:
L'eliminazione di un utente comporta l'eliminazione di tutti i prodotti creati dall'utente.

Valutazione:
Comportamento non coerente con il contesto di un gestionale aziendale.

Scenario reale:
Un dipendente può lasciare l'azienda, ma i dati creati durante il suo periodo lavorativo devono rimanere disponibili.

Decisione:

- Gli utenti non verranno eliminati fisicamente.
- Gli utenti verranno disattivati.
- I prodotti manterranno il riferimento all'utente creatore.
- La tracciabilità storica verrà preservata.

Impatto:

- Rivalutare ON DELETE CASCADE sulla foreign key created_by.
- Introdurre in futuro una gestione di account attivi/disattivati.

### Gestione updated_at

MySQL:
ON UPDATE CURRENT_TIMESTAMP

PostgreSQL:
Trigger + Trigger Function

Motivazione:
PostgreSQL non supporta ON UPDATE CURRENT_TIMESTAMP
direttamente nella definizione della colonna.

Risultato:
Il campo updated_at viene aggiornato automaticamente
prima di ogni UPDATE sulla tabella products.
# FASE 7 - Conversione Schema PostgreSQL

Status: ✅ COMPLETATA

Risultati:
- Conversione AUTO_INCREMENT → SERIAL
- Conversione ENUM → CHECK constraint
- Revisione foreign key
- Revisione regole di cancellazione
- Implementazione trigger per updated_at
- Preservazione della tracciabilità utenti
- Preservazione dei prodotti in caso di eliminazione categoria

Decisioni progettuali:

products.created_by
- ON DELETE RESTRICT

products.category_id
- ON DELETE SET NULL

products.updated_at
- Gestione automatica tramite trigger PostgreSQL
FOREIGN_KEY_CHECKS rimosso.

Motivazione:
costrutto MySQL-specifico.

Le DELETE vengono già eseguite
nell'ordine corretto:

products
↓
categories
↓
users

Quindi non è necessario disabilitare i controlli referenziali.

# FASE 9 - Validazione Database PostgreSQL

Status: ✅ COMPLETATA

Test eseguiti:

✅ Creazione tabelle
✅ Caricamento seed
✅ Verifica foreign keys
✅ Verifica trigger updated_at
✅ Verifica ON DELETE SET NULL
✅ Verifica ON DELETE RESTRICT

Risultati:

- I prodotti sopravvivono alla cancellazione di una categoria.
- category_id viene impostato a NULL.
- Gli utenti referenziati dai prodotti non possono essere eliminati.
- updated_at viene aggiornato automaticamente ad ogni UPDATE.
- Il database PostgreSQL replica correttamente le regole di business desiderate.