import { authService, getUserDataService, getUserAvatarService, registerService, deleteUserService, createRootUserService, getUserProfileService, verifyEmailService, verifyEmailTokenService, updateUserService, getUsersService, changeUserRoleService } from "../service/user.js";
import { successResponse, validateRequired, validateFieldRequired, cookieResponse } from "../utils/response.js";
import { controller } from "../utils/controller.js";

export const authUser = controller(async (req, res) => {
    validateRequired(req.body, ["email", "password", "captcha"], true);

    const { email, password, captcha } = req.body;

    const token = await authService(email, password, captcha);

    return cookieResponse(res, token);
});

export const googleAuth = controller(async (req, res) => {
    const token = req.user.token

    return cookieResponse(res, token, true);
});

export const logoutUser = controller(async (req, res) => {
    return cookieResponse(res, null, false);
});

export const verifyEmail = controller(async (req, res) => {
    const response = await verifyEmailService(req.user);

    return successResponse(res, response);
});

export const verifyEmailToken = controller(async (req, res) => {
    validateRequired(req.body, ["token"], true);

    const { token } = req.body;

    const response = await verifyEmailTokenService(token);

    return successResponse(res, response);
});

export const getUsers = controller(async (req, res) => {
    const { id } = req.user;

    const usersData = await getUsersService(req.query, id);

    return successResponse(res, usersData)
})

export const getUserDataById = controller(async (req, res) => {
    const { id } = req.params;

    const userData = await getUserProfileService(id);

    return successResponse(res, userData);
})

export const getUserData = controller(async (req, res) => {
    const { id } = req.user;

    const userData = await getUserDataService(id);

    return successResponse(res, userData);
});

export const getUserAvatar = controller(async (req, res) => {
    const { id } = req.user;

    await getUserAvatarService(id, res);
});

export const getUserProfile = controller(async (req, res) => {
    const { id } = req.user;

    const userProfile = await getUserProfileService(id);

    successResponse(res, userProfile)
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

export const updateUser = controller(async (req, res) => {
    const newData = req.body || {};
    const { id } = req.user;

    const user = await updateUserService(id, newData);

    return successResponse(res, user, 200)
});

export const changeUserRole = controller(async (req, res) => {
    const { id, role } = req.params;

    const user = await changeUserRoleService(id, role);

    successResponse(res, user);
});

export const deleteUser = controller(async (req, res) => {
    const { id } = req.user;

    await deleteUserService(id);

    return cookieResponse(res, null, false);
});

export const deleteUserById = controller(async (req, res) => {
    const { id } = req.params;

    await deleteUserService(id);

    successResponse(res)
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