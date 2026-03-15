import { authService, getUserDataService, registerService, deleteUserService, updateUserService } from "../service/user.js";
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


export const getUserProfile = controller(async (req, res) => {
    const { name, lastname, phoneNumber, address, email } = req.user;

    return successResponse(res, {
        name,
        lastname,
        phoneNumber,
        address,
        email
    });
});


export const createUser = controller(async (req, res) => {
    validateRequired(req.body, [
        "name",
        "lastname",
        "phoneNumber",
        "address",
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

    await deleteUserService(userId);

    return successResponse(res, { message: "User deleted successfully" });
});


export const updateUser = controller(async (req, res) => {
    validateFieldRequired(req.body, "userId");

    const { userId, name, lastname, phoneNumber, address, password } = req.body;

    if (!name && !lastname && !phoneNumber && !address && !password) {
        const err = new Error("At least one field must be provided");
        err.code = "NO_FIELDS_TO_UPDATE";
        err.status = 400;
        throw err;
    }

    const user = await updateUserService({
        userId,
        name,
        lastname,
        phoneNumber,
        address,
        password
    });

    return successResponse(res, user);
});