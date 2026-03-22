import apiAxios from "./axios";
import { jwtDecode } from "jwt-decode";

export const apiAuth = async ({ email, password, captcha }) => {
    try {
        const response = await apiAxios.post("/users/login", { email, password, captcha });
        return response.data;
    } catch (error) {
        console.error("Error en autenticación:", error);
        return error.response.data
    }
};

export const apiMe = async () => {
    try {
        const response = await apiAxios.get("/users/me");
        return response.data;
    } catch (error) {
        console.error("Error en obtener información personal:", error);
    }
};

export const apiCreate = async ({ email, password, captcha }) => {
    try {
        const response = await apiAxios.post('/users/register', { email, password, captcha });
        return response.data;
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
}

export const apiUpdate = async (id, { name, password }) => {
    try {
        const response = await apiAxios.put(`/users/${id}`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error en actualizar usuario:", error);
    }
};

export const apiDelete = async (id) => {
    try {
        const response = await apiAxios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}

export const decodeToken = () => {
    const token = sessionStorage.getItem("nf_meals") || null;
    return token ? jwtDecode(token) : null;
};