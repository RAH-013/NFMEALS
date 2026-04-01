import { createContext, useState, useCallback, useEffect } from "react";
import { apiMe, apiLogout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const refreshUser = useCallback(async () => {
        setLoading(true);
        try {
            const { success, data, error } = await apiMe();

            if (success && data) {
                setUser(data);
            } else {
                setUser(null);
                console.error("Error al obtener usuario:", error || "Desconocido");
            }
        } catch (err) {
            setUser(null);
            console.error("Error de red o excepción:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = async () => {
        await refreshUser();
    };

    const logout = async () => {
        try {
            await apiLogout();
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        } finally {
            setUser(null);
            navigate("/");
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}