import { User } from "../model/index.js";
import { errorResponse, logError } from "../utils/response.js";
import { verifyAuthJWT } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token

    if (!token) {
      const error = new Error("Token faltante");
      error.code = "AUTH_TOKEN_MISSING";
      error.status = 401;
      throw error;
    }

    const decoded = verifyAuthJWT(token);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      const error = new Error("Token inválido");
      error.code = "AUTH_USER_INVALID";
      error.status = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (err) {
    logError(req, err);
    return errorResponse(
      res,
      err.message || "Error de autenticación",
      err.code || "AUTH_ERROR",
      err.status || 401
    );
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    const error = new Error("No autorizado");
    error.code = "AUTH_ADMIN_REQUIRED";
    error.status = 403;
    return errorResponse(res, error.message, error.code, error.status);
  }
  next();
};

export const errorHandler = (err, req, res, next) => {
  logError(req, err);

  if (err.type === "entity.parse.failed") {
    return errorResponse(res, "Formato JSON inválido", "INVALID_JSON", 400);
  }

  if (err.code) {
    return errorResponse(res, err.message, err.code, err.status || 400);
  }

  return errorResponse(res, "Error interno del servidor", "INTERNAL_ERROR", 500);
};

//Solo evitar generar compras si no esta verificado el correo en cuentas locales.
/*if (!user.isEmailVerified) {
      const error = new Error("Correo no verificado");
      error.code = "EMAIL_NOT_VERIFIED";
      error.status = 403;
      throw error;
    }*/