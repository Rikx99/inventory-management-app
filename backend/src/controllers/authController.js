import * as authService from '../services/authService.js';

// Registrazione nuovo utente
export const registerUser = async (req, res) => {
  try {
    // Riceve i dati dal middleware di validazione
    await authService.createUser(req.body);
    return res.status(201).json({ message: 'Successfully registered user' });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ message: error.message });
    }
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login utente 
export const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
      message: 'Successful login!',
      ...result
    });
  } catch (error) {
    // Gestione errore credenziali non valide (401)
    if (error.statusCode === 401) {
      return res.status(401).json({ message: error.message });
    }
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};