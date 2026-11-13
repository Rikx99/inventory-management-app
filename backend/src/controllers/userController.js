import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const getUsers = async (req, res) => {
  const { search, role } = req.query;

  try {
    let query = 'SELECT id, username, email, role, created_at FROM users WHERE 1=1';
    const queryParams = [];

    if (search) {
      const usernameParam = queryParams.length + 1;
      const emailParam = usernameParam + 1;
      query += ` AND (username LIKE $${usernameParam} OR email LIKE $${emailParam})`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
      query += ` AND role = $${queryParams.length + 1}`;
      queryParams.push(role);
    }

    query += ' ORDER BY created_at DESC';

    const users = await db.query(query, queryParams);
    return res.json(users.rows);
  } catch (error) {
    console.error('Error reading users:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await db.query(
      'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
      [id],
    );

    if (users.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(users.rows[0]);
  } catch (error) {
    console.error('Error retrieving user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const normalizedUsername = String(username).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    if (normalizedUsername.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
    }

    const existing = await db.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [normalizedEmail, normalizedUsername],
    );

    if (existing.rowCount > 0) {
      return res.status(400).json({ message: 'Email or username already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userRole = role === 'admin' ? 'admin' : 'user';

    const result = await db.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id',
      [normalizedUsername, normalizedEmail, passwordHash, userRole],
    );

    return res.status(201).json({
      message: 'User created successfully!',
      userId: result.rows[0].id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const users = await db.query('SELECT id FROM users WHERE id = $1', [id]);
    if (users.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updates = [];
    const values = [];

    if (username !== undefined) {
      const trimmedUsername = String(username).trim();
      if (trimmedUsername.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
      }
      values.push(trimmedUsername);
      updates.push(`username = $${values.length}`);
    }

    if (email !== undefined) {
      const trimmedEmail = String(email).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
      values.push(trimmedEmail);
      updates.push(`email = $${values.length}`);
    }

    if (role !== undefined) {
      if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'Role must be either admin or user.' });
      }
      values.push(role);
      updates.push(`role = $${values.length}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No valid fields were provided for the update.' });
    }

    const duplicateCheck = await db.query(
      'SELECT id FROM users WHERE (username = $1 OR email = $2) AND id != $3',
      [
        username !== undefined ? String(username).trim() : null,
        email !== undefined ? String(email).trim().toLowerCase() : null,
        id,
      ],
    );

    if (duplicateCheck.rowCount > 0) {
      return res.status(400).json({ message: 'Email or username already in use.' });
    }

    await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${values.length + 1}`,
      [...values, id],
    );

    return res.json({ message: 'User details updated successfully!' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentAdminId = req.user.id;

  if (Number(id) === currentAdminId) {
    return res.status(400).json({ message: 'You cannot delete your own account.' });
  }

  try {
    const result = await db.query('DELETE FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};