import db from '../config/db.js';

// GET tutti i prodotti (supporta filtri e JOIN con categories)
export const getProducts = async (req, res) => {
    const {search, category} = req.query;

    try{
        let query = `
        SELECT p.*, c.name AS category_name, u.username AS created_by_username
        FROM products p
        JOIN categories c ON p.category_id = c.id
        JOIN users u ON p.created_by = u.id
        WHERE 1=1
        `;
        const queryParams = [];

        if(search){
            query += `AND p.title LIKE ?`;
            queryParams.push(category);
        }

        query += `ORDER BY p.created_at DESC`;

        const [products] = await db.execute(query, queryParams);
        res.json(products);
    } catch (error) {
        console.error('Error in product recovery:', error);
        res.status(500).json({message: 'Internal server error.'});
    }
};

// Nuovo prodotto (Rotta Protetta)
export const createProduct = async (req, res) => {
    const {title, description, price, stock_quantity, category_id} = req.body;
    const created_by = req.user.id; // Estratto dal middleware verifyToken

    if(!title || !price || !category_id){
        return res.status(400).json({message: 'Title, price and category are required.'});
    }

    try{
        const [result] = await db.execute(
            `INSERT INTO products (title, description, price, stock_quantity, category_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description || '', price, stock_quantity || 0, category_id, created_by]
        );
        res.status(201).json({
            message: 'Product successfuly created!',
            productId: result.insertId
        });
    } catch (error){
        console.error('Error while creating the product:', error);
        res.status(500),json({message: 'Internal server error.'});
    }
};

// DELETE prodotto (Rotta Protetta)

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Prodotto non trovato.' });
    }

    res.json({ message: 'Prodotto eliminato con successo.' });
  } catch (error) {
    console.error('Errore eliminazione prodotto:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};

// GET tutte le categorie
export const getCategories = async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Errore recupero categorie.' });
  }
};