const ADMIN_TOKEN = 'indus-admin-secret-2024';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    if (token !== ADMIN_TOKEN) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    next();
};

module.exports = authMiddleware;
