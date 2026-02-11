import { useAuthStore } from '@/src/store/authStore';
import { authAPI } from '@/src/api/client';
import { useState } from 'react';

export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const storeLogin = useAuthStore((state) => state.login);
    const storeRegister = useAuthStore((state) => state.register);
    const storeLogout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            await storeLogin(email, password);
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
            await storeRegister(data);
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
            await storeLogout();
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout: handleLogout,
        loading,
        error,
    };
}
