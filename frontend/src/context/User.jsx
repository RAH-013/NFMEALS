import { createContext, useState, useCallback, useEffect } from "react";
import { apiMe } from "../api/auth";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const refreshUser = useCallback(async () => {
        try {
            setLoading(true);
            const me = await apiMe();
            setUser(me);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("nf_meals");

        if (token) {
            refreshUser();
        }
    }, [refreshUser]);

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}