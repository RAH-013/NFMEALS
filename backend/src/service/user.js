import { User } from "../model/index.js"
import { JWT_SECRET } from "../config/env.js";
import { Op } from "sequelize";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const authService = async (email, password) => {
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

    return jwt.sign(
        {
            id: user.id,
            role: user.role || "customer"
        },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const registerService = async ({
    name,
    lastname,
    phoneNumber,
    address,
    email,
    password
}) => {
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
        name,
        lastname,
        phoneNumber,
        address,
        email,
        password: await bcrypt.hash(password, SALT_ROUNDS)
    });

    return { email: user.email };
};

export const getUserDataService = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: ["name", "lastname", "phoneNumber", "address"]
    });

    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return user;
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

export const updateUserService = async ({
    userId,
    name,
    lastname,
    phoneNumber,
    address,
    email,
    password
}) => {
    const updateData = {};

    if (name) updateData.name = name;
    if (lastname) updateData.lastname = lastname;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;

    if (email) {
        const existingEmail = await User.findOne({
            where: {
                email,
                id: { [Op.ne]: userId }
            },
            attributes: ["id"]
        });

        if (existingEmail) {
            const err = new Error("Correo electrónico en uso");
            err.code = "EMAIL_ALREADY_REGISTERED";
            err.status = 409;
            throw err;
        }

        updateData.email = email;
    }

    if (password) {
        updateData.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const [updatedRows] = await User.update(updateData, {
        where: { id: userId }
    });

    if (!updatedRows) {
        const err = new Error("Usuario no encontrado");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    return true;
};

export const createRootUserService = async () => {

    const userCount = await User.count();

    if (userCount > 0) {
        return false;
    }

    const passwordHash = await bcrypt.hash("root", 10);

    await User.create({
        name: "Root",
        lastname: "Admin",
        phoneNumber: "0000000000",
        address: "Memory",
        email: "root@system.local",
        password: passwordHash,
        role: "admin"
    });

    return true;
};