import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Ionicons } from '@expo/vector-icons';
import FreeDeliveryBadge from '@/components/FreeDeliveryBadge';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { data: product, isLoading, error } = useProduct(id);
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!product) return;

        addItem(product, quantity);

        Alert.alert(
            'Ajouté au panier ! 🛒',
            `${quantity}x ${product.title}`,
            [
                { text: 'Continuer', style: 'cancel' },
                { text: 'Voir le panier', onPress: () => router.push('/(tabs)/cart') },
            ]
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#006233" />
                <Text style={styles.loadingText}>Chargement...</Text>
            </View>
        );
    }

    if (error || !product) {
        return (
            <View style={styles.error}>
                <Ionicons name="alert-circle-outline" size={64} color="#d32f2f" />
                <Text style={styles.errorText}>Produit introuvable</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const images = product.images.split(',');
    const showFreeDelivery = product.Store?.offersFreeDelivery;

    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Images */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: images[0] }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />
                    {/* Free Delivery Badge */}
                    {showFreeDelivery && (
                        <View style={styles.badgeContainer}>
                            <FreeDeliveryBadge
                                threshold={product.Store.freeDeliveryThreshold || 8000}
                                variant="compact"
                            />
                        </View>
                    )}

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View style={styles.infoSection}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>
                        {product.price.toLocaleString('fr-DZ')} DA
                    </Text>

                    {/* Store Info */}
                    <View style={styles.storeInfo}>
                        <Ionicons name="storefront-outline" size={16} color="#666" />
                        <Text style={styles.storeName}>{product.Store?.name}</Text>
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.quantitySection}>
                        <Text style={styles.sectionTitle}>Quantité</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Ionicons name="remove" size={20} color="#666" />
                            </TouchableOpacity>

                            <Text style={styles.quantity}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Ionicons name="add" size={20} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button - Fixed at bottom */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Ionicons name="cart-outline" size={24} color="white" />
                    <Text style={styles.addToCartText}>
                        Ajouter au panier ({(product.price * quantity).toLocaleString()} DA)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#d32f2f',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    backButton: {
        backgroundColor: '#006233',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    backButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    imageContainer: {
        width: width,
        height: width,
        backgroundColor: '#f0f0f0',
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    badgeContainer: {
        position: 'absolute',
        top: 60,
        left: 16,
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        right: 16,
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    infoSection: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 80,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#006233',
        marginBottom: 16,
    },
    storeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 16,
    },
    storeName: {
        fontSize: 14,
        color: '#666',
    },
    quantitySection: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 30,
        textAlign: 'center',
    },
    descriptionSection: {
        marginTop: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    addToCartButton: {
        backgroundColor: '#006233',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});
