import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../types';

interface CartState {
    items: CartItem[];
    isLoading: boolean;

    // Actions
    loadCart: () => Promise<void>;
    addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;

    // Computed
    totalItems: number;
    totalPrice: number;
}

const CART_STORAGE_KEY = '@achrilik_cart';

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isLoading: false,
    totalItems: 0,
    totalPrice: 0,

    loadCart: async () => {
        set({ isLoading: true });
        try {
            const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
            if (cartData) {
                const items: CartItem[] = JSON.parse(cartData);
                const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
                const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                set({ items, totalItems, totalPrice, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('[Cart] Error loading cart:', error);
            set({ isLoading: false });
        }
    },

    addItem: async (newItem) => {
        const { items } = get();

        // Check if item already exists (same product, size, color)
        const existingIndex = items.findIndex(
            item =>
                item.productId === newItem.productId &&
                item.size === newItem.size &&
                item.color === newItem.color
        );

        let updatedItems: CartItem[];

        if (existingIndex >= 0) {
            // Update quantity of existing item
            updatedItems = items.map((item, index) =>
                index === existingIndex
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
            );
        } else {
            // Add new item
            const cartItem: CartItem = {
                id: `${newItem.productId}-${newItem.size}-${newItem.color}-${Date.now()}`,
                ...newItem,
            };
            updatedItems = [...items, cartItem];
        }

        // Save to AsyncStorage
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ items: updatedItems, totalItems, totalPrice });
    },

    removeItem: async (id) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== id);

        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ items: updatedItems, totalItems, totalPrice });
    },

    updateQuantity: async (id, quantity) => {
        const { items } = get();

        if (quantity <= 0) {
            // Remove item if quantity is 0
            await get().removeItem(id);
            return;
        }

        const updatedItems = items.map(item =>
            item.id === id ? { ...item, quantity } : item
        );

        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        set({ items: updatedItems, totalItems, totalPrice });
    },

    clearCart: async () => {
        await AsyncStorage.removeItem(CART_STORAGE_KEY);
        set({ items: [], totalItems: 0, totalPrice: 0 });
    },
}));
