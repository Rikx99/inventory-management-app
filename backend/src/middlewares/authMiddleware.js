import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Verifichiamo subito che la secret sia presente nel server
    if (!process.env.JWT_SECRET) {
        console.error('CRITICAL: JWT_SECRET non è configurato nel file .env!');
        return res.status(500).json({ message: 'Internal server error: JWT secret missing.' });
    }

    const authHeader = req.headers['authorization'];
    
    const [scheme, token] = authHeader?.split(' ') || [];

    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
        return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};