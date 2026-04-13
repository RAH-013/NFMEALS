import apiAxios from "./axios";

export const apiGetUsers = async (options) => {
    try {
        const response = await apiAxios.get('/users/all', {
            params: options
        })

        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
    }
}

export const apiUpdate = async (formData) => {
    try {
        const response = await apiAxios.put('/users/', formData);
        return response.data;
    } catch (error) {
        console.error("Error en actualizar usuario:", error);
    }
};

export const apiDelete = async () => {
    try {
        const response = await apiAxios.delete('/users/');
        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
    }
}