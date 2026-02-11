import { useCartStore } from '@/src/store/cartStore';

export function useCart() {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const totalPrice = useCartStore((state) => state.totalPrice);

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
            const storeId = item.storeId || 'unknown';
            if (!storeGroups[storeId]) {
                // Default threshold of 8000 DA
                const threshold = 8000;
                storeGroups[storeId] = {
                    storeName: item.storeName || 'Achrilik',
                    total: 0,
                    threshold,
                    eligible: false,
                    remaining: threshold,
                };
            }
            storeGroups[storeId].total += item.price * item.quantity;
        });

        // Calculate eligibility
        Object.keys(storeGroups).forEach(storeId => {
            const store = storeGroups[storeId];
            store.eligible = store.total >= store.threshold;
            store.remaining = Math.max(0, store.threshold - store.total);
        });

        return storeGroups;
    };

    const getTotal = () => totalPrice;

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
