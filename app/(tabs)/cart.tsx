import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import FreeDeliveryBadge from '@/components/FreeDeliveryBadge';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
    const { items, removeItem, updateQuantity, getTotal, getFreeDeliveryProgress } = useCart();
    const freeDeliveryProgress = getFreeDeliveryProgress();
    const total = getTotal();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Panier ({items.length})</Text>
            </View>

            {items.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyIcon}>🛒</Text>
                    <Text style={styles.emptyTitle}>Votre panier est vide</Text>
                    <Text style={styles.emptySubtitle}>
                        Ajoutez des produits pour commencer
                    </Text>
                </View>
            ) : (
                <>
                    <ScrollView style={styles.items}>
                        {/* Free Delivery Progress per Store */}
                        {Object.entries(freeDeliveryProgress).map(([storeId, progress]) => (
                            <View key={storeId} style={styles.storeSection}>
                                <Text style={styles.storeName}>📍 {progress.storeName}</Text>
                                <View style={styles.badgeContainer}>
                                    <FreeDeliveryBadge
                                        threshold={progress.threshold}
                                        currentAmount={progress.total}
                                        variant="full"
                                    />
                                </View>
                            </View>
                        ))}

                        {/* Cart Items */}
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </ScrollView>

                    {/* Footer with Total and Checkout */}
                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalAmount}>
                                {total.toLocaleString('fr-DZ')} DA
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.checkoutButton}>
                            <Ionicons name="card-outline" size={24} color="white" />
                            <Text style={styles.checkoutText}>Passer commande</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#006233',
        padding: 20,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    items: {
        flex: 1,
        padding: 16,
    },
    storeSection: {
        marginBottom: 16,
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    badgeContainer: {
        marginBottom: 12,
    },
    footer: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006233',
    },
    checkoutButton: {
        backgroundColor: '#006233',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
    },
    checkoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
