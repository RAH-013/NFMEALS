import { authService, getUserDataService, registerService, deleteUserService, createRootUserService, getUserProfileService } from "../service/user.js";
import { successResponse, validateRequired, validateFieldRequired } from "../utils/response.js";
import { controller } from "../utils/controller.js";

export const authUser = controller(async (req, res) => {
    validateRequired(req.body, ["email", "password", "captcha"], true);

    const { email, password, captcha } = req.body;

    const token = await authService(email, password, captcha);

    return successResponse(res, { token });
});

export const getUserData = controller(async (req, res) => {
    const { id } = req.user;

    const userData = await getUserDataService(id);

    return successResponse(res, userData);
});

export const getUserProfile = controller(async (req, res) => {
    validateFieldRequired(req.params, "userId");

    const { userId } = req.params;

    const userProfile = await getUserProfileService(userId);

    successResponse(res, { email, name, lastname, isEmailVerified, role, address, phoneNumber })
});

export const createUser = controller(async (req, res) => {
    validateRequired(req.body, ["email", "password", "captcha"], true);

    const { email, password, captcha } = req.body;

    const user = await registerService({
        email,
        password,
        captcha
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