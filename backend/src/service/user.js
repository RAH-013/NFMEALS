import { Op } from "sequelize"
import { sequelize, User, UserProfile } from "../model/index.js"
import { ALTCHA_SECRET, FRONT_PORT, FRONT_URI } from "../config/env.js"
import { verifySolution } from "altcha-lib"
import { createAuthJWT, createEmailJWT, verifyEmailJWT } from "../utils/jwt.js"
import { sendVerifyEmail } from "../utils/email.js";

import axios from "axios";
import bcrypt from "bcryptjs";

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

    const t = await sequelize.transaction();

    try {
        const user = await User.create({
            email,
            password: await bcrypt.hash(password, SALT_ROUNDS),
            provider: "local",
            role: "customer"
        }, { transaction: t });

        await UserProfile.create({
            userId: user.id,
        }, { transaction: t });

        await t.commit();

        return { email: user.email };

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

export const getUserDataService = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ["email", "isEmailVerified", "role"],
        include: {
            model: UserProfile,
            as: "profile",
            attributes: ["id", "name", "lastname"]
        }
    });

    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return {
        profileId: user.profile.id,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        name: user.profile?.name || null,
        lastname: user.profile?.lastname || null,
    };
};

export const getUserAvatarService = async (userId, res) => {
    const user = await UserProfile.findOne({
        where: { userId },
        attributes: ["id", "name", "lastname", "ProfilePicture"],
        raw: true
    });

    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    if (user.ProfilePicture && user.ProfilePicture.trim() !== '') {
        const imageResponse = await axios.get(user.ProfilePicture, { responseType: 'stream' });
        res.setHeader('Content-Type', imageResponse.headers['content-type']);
        res.setHeader('Content-Length', imageResponse.headers['content-length']);
        return imageResponse.data.pipe(res);
    }

    const hash = `${userId}${user.id}${user.lastname || ''}`
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    const color1 = `hsl(${hue}, 70%, 40%)`;
    const color2 = `hsl(${(hue + 30) % 360}, 60%, 50%)`;

    let initials;
    if (user.name?.trim()) {
        initials = ((user.name[0] || '') + (user.lastname?.[0] || '')).toUpperCase();
    } else if (user.lastname?.trim()) {
        initials = (user.lastname[0] || '').toUpperCase();
    } else {
        initials = "Yo";
    }

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${color1}" />
                    <stop offset="100%" stop-color="${color2}" />
                </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grad)" />
            <text x="50" y="55" text-anchor="middle" dominant-baseline="middle"
                font-family="Sans-serif" font-size="40" font-weight="bold" fill="#fff">
                ${initials}
            </text>
        </svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
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

export const getUsersService = async (options = {}) => {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const search = options.search || "";

    const { page: _p, limit: _l, search: _s, ...filters } = options;

    const offset = (page - 1) * limit;

    const whereClause = {};

    if (search) {
        whereClause[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } }
        ];
    }

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "") {
            whereClause[key] = value;
        }
    }

    const { count, rows } = await User.findAndCountAll({
        attributes: ["id", "email", "isEmailVerified", "role", "createdAt"],
        where: whereClause,
        limit,
        offset,
        include: [
            {
                model: UserProfile,
                as: "profile",
                attributes: ["name", "lastname", "phoneNumber"]
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    if (rows.length === 0 && page > 1) {
        const err = new Error("Página no encontrada");
        err.code = "PAGE_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return {
        info: {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            itemsPerPage: limit
        },
        users: rows
    };
};

export const updateUserService = async (userId, newData) => {
    const { prevPassword, newPassword, ...profileData } = newData;

    const [user, profile] = await Promise.all([
        User.findByPk(userId),
        UserProfile.findOne({ where: { userId } })
    ]);

    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    if (!profile) {
        const err = new Error("Perfil de usuario no encontrado");
        err.code = "PROFILE_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    if (newPassword) {
        if (!prevPassword) {
            const err = new Error("Se requiere la contraseña actual para realizar el cambio.");
            err.code = "MISSING_PREV_PASSWORD";
            err.status = 400;
            throw err;
        }

        const isMatch = await bcrypt.compare(prevPassword, user.password);

        if (!isMatch) {
            const err = new Error("La contraseña actual es incorrecta.");
            err.code = "INVALID_PASSWORD";
            err.status = 400;
            throw err;
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
    }

    const fieldsToUpdate = Object.fromEntries(
        Object.entries(profileData).filter(([_, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(fieldsToUpdate).length > 0) {
        await profile.update(fieldsToUpdate);
    }

    return {
        id: user.id,
    };
};

export const deleteUserService = async (userId) => {
    const t = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            const err = new Error("Usuario no encontrado");
            err.code = "USER_NOT_FOUND";
            err.status = 404;
            throw err;
        }

        await UserProfile.destroy({
            where: { userId: userId },
            transaction: t
        });

        await User.destroy({
            where: { id: userId },
            transaction: t
        });

        await t.commit();

        return true;
    } catch (err) {
        await t.rollback();

        if (!err.status) err.status = 500;
        throw err;
    }
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