import axios from "axios";

const apiAxios = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

apiAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("nf_meals");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message;

        if (message === "API connection failed") {
            console.warn("Fallo de conexión con el API");
            window.location.href = "/";
        }

        return Promise.reject(error);
    },
);

export default apiAxios;