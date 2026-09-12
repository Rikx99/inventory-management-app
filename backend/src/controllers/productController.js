import db from "../config/db.js";

const validateProductUpdatePayload = (body) => {
  const allowedFields = ["title", "description", "price", "stock_quantity", "category_id"];
  const normalized = {};

  for (const [key, value] of Object.entries(body)) {
    if (!allowedFields.includes(key)) continue;

    if (key === "title") {
      if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error("Title must be a non-empty string.");
      }
      normalized.title = value.trim();
      continue;
    }

    if (key === "description") {
      normalized.description = typeof value === "string" ? value.trim() : "";
      continue;
    }

    if (key === "price") {
      const price = Number(value);
      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Price must be a valid non-negative number.");
      }
      normalized.price = price;
      continue;
    }

    if (key === "stock_quantity") {
      const stockQuantity = Number(value);
      if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
        throw new Error("Stock quantity must be a valid non-negative integer.");
      }
      normalized.stock_quantity = stockQuantity;
      continue;
    }

    if (key === "category_id") {
      const categoryId = Number(value);
      if (!Number.isInteger(categoryId) || categoryId <= 0) {
        throw new Error("Category is invalid.");
      }
      normalized.category_id = categoryId;
    }
  }

  return normalized;
};

export const getProducts = async (req, res) => {
  const { search, category } = req.query;

  try {
    let query = `
      SELECT p.*, c.name AS category_name, u.username AS created_by_username
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN users u ON p.created_by = u.id
      WHERE 1 = 1
    `;
    const queryParams = [];

    if (search) {
      query += ' AND p.title LIKE ?';
      queryParams.push(`%${search}%`);
    }

    if (category) {
      query += ' AND c.name = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY p.created_at DESC';

    const [products] = await db.execute(query, queryParams);
    return res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const [product] = await db.execute(
      `SELECT p.*, c.name AS category_name, u.username AS created_by_username
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN users u ON p.created_by = u.id
      WHERE p.id = ?`,
      [id],
    );

    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json(product[0]);
  } catch (error) {
    console.error('Error retrieving product by id:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const insertProduct = async (req, res) => {
  const { title, description, price, stock_quantity, category_id } = req.body;
  const created_by = req.user.id;

  if (!title?.trim() || price === undefined || price === null || !category_id) {
    return res.status(400).json({ message: 'Title, price, and category are required.' });
  }

  const parsedPrice = Number(price);
  const parsedCategoryId = Number(category_id);
  const parsedStockQuantity = Number(stock_quantity ?? 0);

  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
    return res.status(400).json({ message: 'Price must be a valid non-negative number.' });
  }

  if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
    return res.status(400).json({ message: 'Category is invalid.' });
  }

  if (!Number.isInteger(parsedStockQuantity) || parsedStockQuantity < 0) {
    return res.status(400).json({ message: 'Stock quantity must be a valid non-negative integer.' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO products (title, description, price, stock_quantity, category_id, created_by)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        description || '',
        parsedPrice,
        parsedStockQuantity,
        parsedCategoryId,
        created_by,
      ],
    );

    return res.status(201).json({
      message: 'Product created successfully!',
      productId: result.insertId,
    });
  } catch (error) {
    console.error('Error creating the product:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const fields = validateProductUpdatePayload(req.body);

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: 'No valid fields were provided for the update.' });
    }

    const setClause = Object.keys(fields).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(fields);

    const [result] = await db.execute(
      `UPDATE products SET ${setClause} WHERE id = ?`,
      [...values, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(400).json({ message: error.message || 'Invalid product data.' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    return res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
    return res.json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    return res.status(500).json({ message: 'Error retrieving categories.' });
  }
};

export const getProductsPaginated = async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
  const offset = (page - 1) * limit;

  try {
    // Iniettare limit e offset direttamente come numeri sicuri evita l'errore dei prepared statement di MySQL
    const [products] = await db.execute(
      `SELECT p.*, c.name AS category_name, u.username AS created_by_username
       FROM products p
       JOIN categories c ON p.category_id = c.id
       JOIN users u ON p.created_by = u.id
       ORDER BY p.created_at DESC 
       LIMIT ${limit} OFFSET ${offset}`
    );

    const [countResult] = await db.execute('SELECT COUNT(*) AS total FROM products');
    const total = countResult[0].total;

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    console.error('Error retrieving paginated products:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
