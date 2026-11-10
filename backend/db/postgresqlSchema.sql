-- 1. Tabella Categorie
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabella Utenti
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabella Prodotti
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  category_id INTEGER NULL,
  created_by INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   -- Relazioni (Foreign Keys)
  CONSTRAINT fk_product_category 
    FOREIGN KEY (category_id) REFERENCES categories(id) 
    ON DELETE SET NULL,
  CONSTRAINT fk_product_user 
    FOREIGN KEY (created_by) REFERENCES users(id) 
    ON DELETE RESTRICT
);

-- Funzione trigger che aggiorna automaticamente il timestamp
-- updated_at ogni volta che un prodotto viene modificato.
CREATE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Esegue la funzione di aggiornamento del timestamp
-- prima di ogni modifica alla tabella products.
CREATE TRIGGER update_product_updated_at
  BEFORE UPDATE ON products 
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
