import { User, UserProfile } from "../model/index.js"
import { ALTCHA_SECRET, FRONT_PORT, FRONT_URI } from "../config/env.js"
import { verifySolution } from "altcha-lib"
import { createAuthJWT, createEmailJWT, verifyEmailJWT } from "../utils/jwt.js"

import bcrypt from "bcryptjs";
import { sendVerifyEmail } from "../utils/email.js";

const SALT_ROUNDS = 10;

export const authService = async (email, password, captcha) => {
    const isValidCaptcha = await verifySolution(captcha, ALTCHA_SECRET);

    if (!isValidCaptcha) {
        const err = new Error("Captcha inválido");
        err.code = "INVALID_CAPTCHA";
        err.status = 400;
        throw err;
    }

    const user = await User.findOne({
        where: { email },
        attributes: ["id", "password", "role"]
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        const err = new Error("Credenciales inválidas");
        err.code = "INVALID_CREDENTIALS";
        err.status = 401;
        throw err;
    }

    return createAuthJWT(user);
};

export const verifyEmailService = async (user) => {
    if (!user) {
        const err = new Error("Usuario no disponible");
        err.code = "INVALID_USER";
        err.status = 401;
        throw err;
    }

    const token = createEmailJWT(user);

    const front = new URL(FRONT_URI);
    front.port = FRONT_PORT;
    front.pathname = "/authenticate/verify-email/";
    front.searchParams.set("token", token);

    const link = front.toString();

    const emailSend = await sendVerifyEmail(user, link);

    return emailSend ? true : false;
};

export const verifyEmailTokenService = async (token) => {
    if (!token) {
        const err = new Error("Token no disponible");
        err.code = "INVALID_TOKEN";
        err.status = 401;
        throw err;
    }

    const { id } = verifyEmailJWT(token) || {};

    if (!id) {
        const err = new Error("Token inválido o expirado");
        err.code = "INVALID_TOKEN";
        err.status = 401;
        throw err;
    }

    const user = await User.findByPk(id);
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    user.isEmailVerified = true;
    await user.save();

    return user;
};

export const registerService = async ({ email, password, captcha }) => {
    const isValidCaptcha = await verifySolution(captcha, ALTCHA_SECRET);

    if (!isValidCaptcha) {
        const err = new Error("Captcha inválido");
        err.code = "INVALID_CAPTCHA";
        err.status = 400;
        throw err;
    }

    const existingUser = await User.findOne({
        where: { email },
        attributes: ["id"]
    });

    if (existingUser) {
        const err = new Error("Correo electrónico en uso");
        err.code = "EMAIL_ALREADY_REGISTERED";
        err.status = 409;
        throw err;
    }

    const user = await User.create({
        email,
        password: await bcrypt.hash(password, SALT_ROUNDS),
        provider: "local",
        role: "customer"
    });

    return { email: user.email };
};

export const getUserDataService = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ["email", "isEmailVerified", "role"],
        include: {
            model: UserProfile,
            as: "profile",
            attributes: ["name", "lastname", "profilePicture"]
        }
    });

    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return {
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        name: user.profile?.name || null,
        lastname: user.profile?.lastname || null,
        profilePicture: user.profile?.profilePicture || null
    };
};

export const getUserProfileService = async (userId) => {
    const profile = await UserProfile.findOne({
        where: { userId },
        attributes: [
            "phoneNumber",
            "street",
            "exteriorNumber",
            "interiorNumber",
            "neighborhood",
            "city",
            "municipality",
            "state",
            "postalCode",
            "country"
        ]
    });

    if (!profile) {
        const err = new Error("Perfil no encontrado");
        err.code = "PROFILE_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return profile;
};

export const deleteUserService = async (userId) => {
    const deleted = await User.destroy({
        where: { id: userId }
    });

    if (!deleted) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return true;
};

export const createRootUserService = async () => {
    const userCount = await User.count();
    if (userCount > 0) return false;

    const passwordHash = await bcrypt.hash("root", 10);

    const user = await User.create({
        email: "root@system.local",
        password: passwordHash,
        isEmailVerified: true,
        role: "admin"
    });

    const profile = await UserProfile.create({
        userId: user.id,
        name: "Root",
        lastname: "Admin",
        phoneNumber: "0000000000",
    });

    if (user && profile) return true

    else return false;
};