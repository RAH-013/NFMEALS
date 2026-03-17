export const validateFieldRequired = (body, field, generic = false) => {
    if (
        !(field in body) ||
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
    ) {

        const err = new Error(
            generic ? "Información obligatoria faltante" : `El campo ${field} es requerido`
        );

        err.code = generic
            ? "REQUIRED_FIELDS_MISSING"
            : `${field.toUpperCase()}_REQUIRED`;

        err.status = 400;

        throw err;
    }
};

export const validateRequired = (body, fields, generic = false) => {
    for (const field of fields) {
        validateFieldRequired(body, field, generic);
    }
};

export const successResponse = (res, data = null, status = 200) => {
    return res.status(status).json({
        success: true,
        data,
        error: null
    });
};

export const errorResponse = (res, message = "Error del servidor", code = "SERVER_ERROR", status = 500) => {
    return res.status(status).json({
        success: false,
        data: null,
        error: {
            message,
            code
        }
    });
};

export const logError = (req, error) => {
    const ip =
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress;

    console.log({
        message: error.message,
        code: error.code,
        status: error.status,
        stack: error.stack,
        ip,
        endpoint: req.originalUrl,
        method: req.method,
        userAgent: req.headers["user-agent"],
        user: req.user?.id,
        body: req.body,
        params: req.params,
        timestamp: new Date().toISOString()
    });
};