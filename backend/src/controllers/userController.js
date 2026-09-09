import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const getUsers = async (req, res) => {
  const { search, role } = req.query;

  try {
    let query = 'SELECT id, username, email, role, created_at FROM users WHERE 1=1';
    const queryParams = [];

    if (search) {
      query += ' AND (username LIKE ? OR email LIKE ?)';
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (role) {
      query += ' AND role = ?';
      queryParams.push(role);
    }

    query += ' ORDER BY created_at DESC';

    const [users] = await db.execute(query, queryParams);
    return res.json(users);
  } catch (error) {
    console.error('Error reading users:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await db.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [id],
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(users[0]);
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

    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [normalizedEmail, normalizedUsername],
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email or username already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userRole = role === 'admin' ? 'admin' : 'user';

    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [normalizedUsername, normalizedEmail, passwordHash, userRole],
    );

    return res.status(201).json({
      message: 'User created successfully!',
      userId: result.insertId,
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
    const [users] = await db.execute('SELECT id FROM users WHERE id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updates = [];
    const values = [];

    if (username !== undefined) {
      const trimmedUsername = String(username).trim();
      if (trimmedUsername.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
      }
      updates.push('username = ?');
      values.push(trimmedUsername);
    }

    if (email !== undefined) {
      const trimmedEmail = String(email).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
      updates.push('email = ?');
      values.push(trimmedEmail);
    }

    if (role !== undefined) {
      if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ message: 'Role must be either admin or user.' });
      }
      updates.push('role = ?');
      values.push(role);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No valid fields were provided for the update.' });
    }

    const [duplicateCheck] = await db.execute(
      'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?',
      [
        username !== undefined ? String(username).trim() : null,
        email !== undefined ? String(email).trim().toLowerCase() : null,
        id,
      ],
    );

    if (duplicateCheck.length > 0) {
      return res.status(400).json({ message: 'Email or username already in use.' });
    }

    await db.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
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
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};