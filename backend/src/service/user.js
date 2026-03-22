import { User, UserProfile } from "../model/index.js"
import { ALTCHA_SECRET } from "../config/env.js"
import { Op } from "sequelize";
import { verifySolution } from "altcha-lib"
import { createJWT } from "../utils/jwt.js"

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    return createJWT(user);
};

export const EmailVerificationService = (userId) => {

}

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
        attributes: ["email", "role"],
        include: {
            model: UserProfile,
            as: "profile",
            attributes: ["name", "lastname"]
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
        name: user.profile?.name || null,
        lastname: user.profile?.lastname || null
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