import { create } from 'zustand';
import { cartStore } from '@/src/store/cartStore';

// Re-export the store with hooks
export function useCart() {
    const items = cartStore((state) => state.items);
    const addItem = cartStore((state) => state.addItem);
    const removeItem = cartStore((state) => state.removeItem);
    const updateQuantity = cartStore((state) => state.updateQuantity);
    const clearCart = cartStore((state) => state.clearCart);
    const getTotal = cartStore((state) => state.getTotal);

    // Calculate free delivery progress per store
    const getFreeDeliveryProgress = () => {
        const storeGroups: {
            [storeId: string]: {
                storeName: string;
                total: number;
                threshold: number;
                eligible: boolean;
                remaining: number;
            }
        } = {};

        items.forEach(item => {
            const storeId = item.product.Store?.id || 'unknown';
            if (!storeGroups[storeId]) {
                const threshold = item.product.Store?.freeDeliveryThreshold || 8000;
                storeGroups[storeId] = {
                    storeName: item.product.Store?.name || 'Achrilik',
                    total: 0,
                    threshold,
                    eligible: false,
                    remaining: threshold,
                };
            }
            storeGroups[storeId].total += item.product.price * item.quantity;
        });

        // Calculate eligibility
        Object.keys(storeGroups).forEach(storeId => {
            const store = storeGroups[storeId];
            store.eligible = store.total >= store.threshold;
            store.remaining = Math.max(0, store.threshold - store.total);
        });

        return storeGroups;
    };

    return {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getFreeDeliveryProgress,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    };
}
