import bcrypt from 'bcryptjs';
import db from '../config/db.js';

// GET /api/users - Ottieni tutti gli utenti (con filtri ?search= e ?role=)
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
    res.json(users);
  } catch (error) {
    console.error('Errore durante la lettura degli utenti:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};

// GET /api/users/:id - Ottieni un singolo utente per ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const [users] = await db.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Errore durante il recupero dell\'utente:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};

// POST /api/users - Crea un nuovo utente da pannello Admin
export const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email e password sono obbligatori.' });
  }

  try {
    // Controllo unicità email e username
    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email o Username già esistenti.' });
    }

    // Cifratura password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Inserimento utente (il ruolo predefinito è 'user' se non specificato)
    const userRole = role === 'admin' ? 'admin' : 'user';

    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [username, email, passwordHash, userRole]
    );

    res.status(201).json({
      message: 'Utente creato con successo!',
      userId: result.insertId
    });
  } catch (error) {
    console.error('Errore durante la creazione dell\'utente:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};

// PUT /api/users/:id - Modifica utente (ruolo, email o username)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    // Verifica esistenza utente
    const [users] = await db.execute('SELECT id FROM users WHERE id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }

    await db.execute(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, id]
    );

    res.json({ message: 'Dati utente aggiornati con successo!' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'utente:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};

// DELETE /api/users/:id - Elimina un utente
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentAdminId = req.user.id; // ID ricavato dal Token JWT

  // Blocco di sicurezza: l'admin non può cancellare se stesso
  if (parseInt(id) === currentAdminId) {
    return res.status(400).json({ message: 'Non puoi eliminare il tuo stesso account.' });
  }

  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }

    res.json({ message: 'Utente eliminato con successo.' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione dell\'utente:', error);
    res.status(500).json({ message: 'Errore interno del server.' });
  }
};