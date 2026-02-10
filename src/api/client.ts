import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://achrilik.com/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await SecureStore.getItemAsync('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('[API] Error getting auth token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Clear token and redirect to login
            await SecureStore.deleteItemAsync('auth_token');
            // TODO: Navigate to login screen
            console.log('[API] 401 Unauthorized - redirecting to login');
        }

        // Handle network errors
        if (!error.response) {
            console.error('[API] Network error:', error.message);
            return Promise.reject({
                message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
                error,
            });
        }

        // Handle other errors
        const errorMessage = error.response?.data?.error || error.message || 'Une erreur est survenue';
        console.error('[API] Error:', errorMessage);

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

// ===== API Endpoints =====

export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/auth/login', { email, password });
        const { token, user } = response.data;

        // Store token securely
        await SecureStore.setItemAsync('auth_token', token);

        return { token, user };
    },

    register: async (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
    }) => {
        const response = await apiClient.post('/auth/register', data);
        const { token, user } = response.data;

        await SecureStore.setItemAsync('auth_token', token);

        return { token, user };
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('auth_token');
    },

    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};

export const productsAPI = {
    getAll: async (params?: {
        search?: string;
        categoryId?: string;
        minPrice?: number;
        maxPrice?: number;
        sizes?: string[];
        colors?: string[];
        wilayas?: string[];
        freeDelivery?: boolean;
        clickCollect?: boolean;
        minRating?: number;
    }) => {
        const response = await apiClient.get('/products', { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    },

    search: async (query: string) => {
        const response = await apiClient.get('/search/suggestions', {
            params: { q: query },
        });
        return response.data;
    },
};

export const cartAPI = {
    get: async () => {
        // For now, cart is stored locally
        // Future: sync with server
        return [];
    },

    add: async (productId: string, quantity: number, variant?: any) => {
        // TODO: Implement server-side cart
        console.log('[API] Adding to cart:', { productId, quantity, variant });
    },
};

export const ordersAPI = {
    getAll: async () => {
        const response = await apiClient.get('/orders');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get(`/orders/${id}`);
        return response.data;
    },

    create: async (orderData: any) => {
        const response = await apiClient.post('/orders', orderData);
        return response.data;
    },
};

export default apiClient;
