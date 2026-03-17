import { authService, getUserDataService, registerService, deleteUserService, updateUserService, createRootUserService } from "../service/user.js";
import { successResponse, validateRequired, validateFieldRequired } from "../utils/response.js";
import { controller } from "../utils/controller.js";

export const authUser = controller(async (req, res) => {
    validateRequired(req.body, ["email", "password"], true);

    const { email, password } = req.body;

    const token = await authService(email, password);

    return successResponse(res, { token });
});

export const getUserData = controller(async (req, res) => {
    validateFieldRequired(req.params, "userId");

    const { userId } = req.params;

    const userData = await getUserDataService(userId);

    return successResponse(res, userData);
});

export const getUserProfile = controller(async (req, res) => successResponse(res, req.user));

export const createUser = controller(async (req, res) => {
    validateRequired(req.body, [
        "name",
        "email",
        "password"
    ]);

    const { name, lastname, phoneNumber, address, email, password } = req.body;

    const user = await registerService({
        name,
        lastname,
        phoneNumber,
        address,
        email,
        password
    });

    return successResponse(res, user, 201);
});

export const deleteUser = controller(async (req, res) => {
    validateFieldRequired(req.params, "userId");

    const { userId } = req.params;
    const { id, role } = req.user;

    if (role !== "admin" && userId !== id) {
        const err = new Error("Prohibido");
        err.code = "FORBIDDEN";
        err.status = 403;
        throw err;
    }

    await deleteUserService(userId);

    return successResponse(res, { message: "Usuario eliminado correctamente" });
});

export const updateUser = controller(async (req, res) => {
    validateFieldRequired(req.params, "userId");

    const { userId } = req.params;
    const { name, lastname, phoneNumber, address, email, password } = req.body;
    const { id, role } = req.user;

    if (role !== "admin" && userId !== id) {
        const err = new Error("Prohibido");
        err.code = "FORBIDDEN";
        err.status = 403;
        throw err;
    }

    if (!name && !lastname && !phoneNumber && !address && !email && !password) {
        const err = new Error("Debe proporcionarse al menos un campo");
        err.code = "NO_FIELDS_TO_UPDATE";
        err.status = 400;
        throw err;
    }

    await updateUserService({
        userId,
        name,
        lastname,
        phoneNumber,
        address,
        email,
        password
    });

    return successResponse(res, { message: "Usuario actualizado correctamente" });
});

export const createRootUser = async () => {
    try {

        const created = await createRootUserService();

        if (created) {
            console.log("Usuario ROOT creado");
        }

    } catch (error) {
        console.log("Error creating root user:", error.message);
    }
};