import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";

export function createJWT(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role || "customer"
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}