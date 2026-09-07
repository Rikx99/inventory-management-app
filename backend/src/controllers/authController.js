import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

// Registrazione nuovo utente
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(404).json({message: 'All fields are required'});
    }

    try{
        //Controllo se l'utente o l'email esistono già
        const [existingUser] = await db.execute(
            'SELECT id FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if(existingUser.length > 0){
            return res.status(400).json({message: 'Email or Username already in use'});
        }

        //Cifratura della password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        //inserimento nel database
        await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );
        res.status(201).json({message: 'Successfully registered user'});
    } catch (error){
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Internal error server'});
    }
};

// Login utente 
export const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }
    try{
        //Cerca l'utente per mail
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if(users.length === 0) {
            return res.status(401).json({message: 'Invalid credentials.'});
        }

        const user = users[0];
        // Verifica password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials.'});
        }

        // Generazione Token JWT (scade in 24 ore)
        const token = jwt.sign(
            {id: user.id, username: user.username, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );
        res.json({
            message: 'Successful login!',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message:'Internal server error'});
    }
};