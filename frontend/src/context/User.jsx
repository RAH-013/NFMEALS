import { createContext, useState, useCallback, useEffect } from "react";
import { apiMe } from "../api/auth";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(() => sessionStorage.getItem("nf_meals"));

    const refreshUser = useCallback(async () => {
        setLoading(true);
        try {
            const { success, data, error } = await apiMe();

            if (success && data) {
                setUser(data);
            } else {
                setUser(null);
                sessionStorage.removeItem("nf_meals");
                setToken(null);
                console.error("Error al obtener usuario:", error || "Desconocido");
            }
        } catch (err) {
            setUser(null);
            sessionStorage.removeItem("nf_meals");
            setToken(null);
            console.error("Error de red o excepción:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        refreshUser();
    }, [token, refreshUser]);

    const login = (newToken) => {
        sessionStorage.setItem("nf_meals", newToken);
        setToken(newToken);
    };

    const logout = () => {
        sessionStorage.removeItem("nf_meals");
        setToken(null);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}