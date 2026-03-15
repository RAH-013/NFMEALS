import { User } from "../model/index.js"
import { JWT_SECRET } from "../config/env.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const authService = async (email, password) => {
    const user = await User.findOne({
        where: { email },
        attributes: ["id", "password", "role"]
    });

    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);

    if (!match) return null;

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
        const err = new Error("Email already registered");
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
        const err = new Error("User not found");
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
        const err = new Error("User not found");
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
    password
}) => {

    const updateData = {};

    if (name) updateData.name = name;
    if (lastname) updateData.lastname = lastname;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;
    if (password) updateData.password = await bcrypt.hash(password, SALT_ROUNDS);

    const [updatedRows] = await User.update(updateData, {
        where: { id: userId }
    });

    if (!updatedRows) {
        const err = new Error("User not found");
        err.code = "USER_NOT_FOUND";
        err.status = 404;
        throw err;
    }

    const user = await User.findByPk(userId, {
        attributes: ["name", "lastname", "phoneNumber", "address"]
    });

    return user;
};