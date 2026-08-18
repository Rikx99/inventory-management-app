-- ========================================================
-- SCRIPT DI POPOLAMENTO DATI FITTIZI (seed.sql)
-- ========================================================

-- Pulisce i dati esistenti prima del popolamento (opzionale)
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM users;
SET FOREIGN_KEY_CHECKS = 1;

-- --------------------------------------------------------
-- 1. POPOLAMENTO TABELLA USERS
-- Nota: L'hash corrisponde alla password 'password123'
-- --------------------------------------------------------
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@inventario.it', '$2a$10$w85VpWjE9Y3K1M4d1x7X7.dE7.lG2iQf7O7k6I8q9J0u1V2W3X4Y5', 'admin'),
('operatore', 'mario.rossi@inventario.it', '$2a$10$w85VpWjE9Y3K1M4d1x7X7.dE7.lG2iQf7O7k6I8q9J0u1V2W3X4Y5', 'user');

-- --------------------------------------------------------
-- 2. POPOLAMENTO TABELLA CATEGORIES
-- --------------------------------------------------------
INSERT INTO categories (name, description) VALUES
('Elettronica', 'Dispositivi hardware, computer e componenti informatici'),
('Accessori Desk', 'Periferiche, supporti e accessori per postazione di lavoro'),
('Arredamento Ufficio', 'Sedie ergonomiche, scrivanie e illuminazione');

-- --------------------------------------------------------
-- 3. POPOLAMENTO TABELLA PRODUCTS
-- --------------------------------------------------------

-- Prodotti per categoria 'Elettronica' (id = 1) creati dall'admin (id = 1)
INSERT INTO products (title, description, price, stock_quantity, category_id, created_by) VALUES
('Monitor LG Ultrawide 34"', 'Monitor curvo IPS 34 pollici WQHD HDR10', 449.99, 12, 1, 1),
('Tastiera Meccanica Keychron K2', 'Tastiera meccanica wireless layout ISO-IT con switch brown', 99.50, 25, 1, 1),
('Mouse Logitech MX Master 3S', 'Mouse ergonomico avanzato con scorrimento ultraveloce', 109.00, 18, 1, 1);

-- Prodotti per categoria 'Accessori Desk' (id = 2) creati dall'operatore (id = 2)
INSERT INTO products (title, description, price, stock_quantity, category_id, created_by) VALUES
('Sottomouse in Feltro XXL', 'Tappetino per scrivania in feltro grigio scuro 90x40cm', 24.99, 50, 2, 2),
('Hub USB-C 8 in 1', 'Adattatore multiporta in alluminio con porta HDMI 4K e Power Delivery', 39.90, 8, 2, 2),
('Supporto Laptop in Alluminio', 'Stand rialzato ventilato per notebook fino a 17 pollici', 29.99, 30, 2, 2);

-- Prodotti per categoria 'Arredamento Ufficio' (id = 3) creati dall'admin (id = 1)
INSERT INTO products (title, description, price, stock_quantity, category_id, created_by) VALUES
('Sedia Ergonomica Mesh', 'Sedia da ufficio traspirante con supporto lombare regolabile', 199.00, 5, 3, 1),
('Lampada LED da Scrivania', 'Lampada con regolazione di luminosita e temperatura colore', 34.50, 15, 3, 1);