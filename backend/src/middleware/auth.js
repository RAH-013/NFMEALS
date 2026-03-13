import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../model/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no proporcionado." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Usuario no válido." });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "No autorizado." });
  }

  next();
};