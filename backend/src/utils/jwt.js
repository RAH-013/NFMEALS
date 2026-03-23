import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EMAIL_SECRET } from "../config/env.js";

export function createAuthJWT(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role || "customer"
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}

export function verifyAuthJWT(token) {
    return jwt.verify(token, JWT_SECRET);
}

export function createEmailJWT(user) {
    return jwt.sign(
        {
            id: user.id,
        },
        JWT_EMAIL_SECRET,
        { expiresIn: "15m" }
    );
}

export function verifyEmailJWT(token) {
    return jwt.verify(token, JWT_EMAIL_SECRET);
}