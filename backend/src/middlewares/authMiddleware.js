import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // il formato atteso dell' header è: "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Salva i dati del utente (id, role, username) nella request
        next(); // Passa al controller successivo
    } catch (err) {
        return res.status(403).json({message: 'Invalid token or expired.'});
    }
};