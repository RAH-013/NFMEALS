export const controller = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        logError(req, error);

        if (error.code) {
            return errorResponse(res, error.message, error.code, error.status || 400);
        }

        return errorResponse(res, "Internal server error", "INTERNAL_ERROR", 500);
    }
};