import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        error: {
            message: "Too many requests",
            code: "RATE_LIMIT"
        }
    }
});

export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        error: {
            message: "Too many login attempts",
            code: "AUTH_RATE_LIMIT"
        }
    }
});

export const registerLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        data: null,
        error: {
            message: "Too many registration attempts",
            code: "REGISTER_RATE_LIMIT"
        }
    }
});