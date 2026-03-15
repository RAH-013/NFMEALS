export const validateFieldRequired = (body, field, generic = false) => {
    if (!(field in body) || body[field] === undefined || body[field] === null) {

        const err = new Error(
            generic ? "Required information missing" : `${field} is required`
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

export const errorResponse = (res, message = "Server error", code = "SERVER_ERROR", status = 500) => {
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

    const userAgent = req.headers["user-agent"];

    console.error({
        message: error.message,
        ip,
        endpoint: req.originalUrl,
        method: req.method,
        userAgent,
        timestamp: new Date().toISOString()
    });
};