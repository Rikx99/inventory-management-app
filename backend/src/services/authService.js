import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Registrazione utente
export const createUser = async ({username, email, password}) => {
    // controllo dublicati
    const [existingUser] = await db.execute(
        'SELECT id FROM users WHERE email = ? or username = ?',
        [email, username]
    );
    if(existingUser.length > 0){
        const error = new Error('Email or Username already in use');
        error.statusCode = 400;
        throw error;
    }
    // Hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    // Inserimento nel db
    await db.execute(
    'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
    [username, email, passwordHash]
  );
};
// Login utente
export const loginUser = async ({ email, password }) => {
  // 1. Controllo configurazione ambiente
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured.');
  }

  // 2. Cerca l'utente per email
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (users.length === 0) {
    const error = new Error('Invalid credentials.');
    error.statusCode = 401;
    throw error;
  }

  const user = users[0];

  // 3. Verifica password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    const error = new Error('Invalid credentials.');
    error.statusCode = 401;
    throw error;
  }

  // 4. Generazione Token JWT
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 5. Payload completo per il controller
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  };
};