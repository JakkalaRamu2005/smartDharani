import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {

    try {
        let token = req.cookies.token;

        // If no cookie, check Authorization header
        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Access denied. NO token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId || decoded.id; // Check both possible field names
        next();

    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please login again' });
        }
        console.error('❌ JWT Verification failed:', error.message);
        return res.status(403).json({ message: 'Invalid token' });




    }









}