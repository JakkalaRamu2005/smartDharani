import jwt from "jsonwebtoken"

export const authenticateToken = (req, res, next) => {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Access denied. NO token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId;
        next();






    } catch (error) {
        if (error.name == 'TokenExpiredError') {


            return res.status(401).json({ message: 'Token expired. Please login again' });
        }
        return res.status(403).json({ message: 'Invalid token' });




    }









}