import { create } from 'zustand';
import { User } from '../types';
import { authAPI } from '../api/client';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    // Actions
    login: (email: string, password: string) => Promise<void>;
    register: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const { token, user } = await authAPI.login(email, password);
            set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            throw error;
        }
    },

    register: async (data) => {
        set({ isLoading: true });
        try {
            const { token, user } = await authAPI.register(data);
            set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({ isLoading: false });
            throw error;
        }
    },

    logout: async () => {
        await authAPI.logout();
        set({ user: null, token: null, isAuthenticated: false });
    },

    loadUser: async () => {
        set({ isLoading: true });
        try {
            const user = await authAPI.getCurrentUser();
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            // Token invalid or expired
            await authAPI.logout();
            set({ user: null, token: null, isAuthenticated: false });
        }
    },
}));
