import { logError, errorResponse } from "./response.js"

export const controller = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (error) {
        logError(req, error);

        if (error.code) {
            return errorResponse(res, error.message, error.code, error.status || 400);
        }

        return errorResponse(res, "Error interno del servidor", "INTERNAL_ERROR", 500);
    }
};