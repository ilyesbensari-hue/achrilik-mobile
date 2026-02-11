import { authStore } from '@/src/store/authStore';
import { authAPI } from '@/src/api/client';
import { useState } from 'react';

export function useAuth() {
    const user = authStore((state) => state.user);
    const setUser = authStore((state) => state.setUser);
    const logout = authStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const { user } = await authAPI.login(email, password);
            setUser(user);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.message || 'Erreur de connexion';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const { user } = await authAPI.register(data);
            setUser(user);
            return { success: true };
        } catch (err: any) {
            const errorMessage = err.message || 'Erreur lors de l\'inscription';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            logout();
        } catch (err) {
            console.error('Logout error:', err);
            // Logout locally anyway
            logout();
        }
    };

    return {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout: handleLogout,
        loading,
        error,
    };
}
