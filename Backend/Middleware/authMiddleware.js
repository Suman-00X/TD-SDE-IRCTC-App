// authenticationMiddleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    console.log("header-token", token)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("token-decoded", decoded)
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};


