import { JWT_SECRET } from "../config/env.js";
import { User } from "../model/index.js"
import { errorResponse, logError } from "../utils/response.js"

import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Token missing");
      error.code = "AUTH_TOKEN_MISSING";
      error.status = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      const error = new Error("Token invalid");
      error.code = "AUTH_USER_INVALID";
      error.status = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (err) {
    logError(req, err);
    return errorResponse(res, err.message, err.code || "AUTH_ERROR", err.status || 401);
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "No autorizado." });

    const error = new Error("Token invalid");
    error.code = "AUTH_ADMIN_REQUIRED";
    error.status = 401;
    throw error;
  }

  next();
};

export const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: "Invalid JSON format",
        code: "INVALID_JSON"
      }
    });
  }

  if (err.code) {
    return res.status(err.status || 400).json({
      success: false,
      data: null,
      error: {
        message: err.message,
        code: err.code
      }
    });
  }

  return res.status(500).json({
    success: false,
    data: null,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR"
    }
  });
};