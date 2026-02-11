import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with margins

interface ProductCardProps {
    product: {
        id: string;
        title: string;
        price: number;
        images: string;
        Store?: {
            name: string;
            offersFreeDelivery?: boolean;
            freeDeliveryThreshold?: number | null;
        };
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const image = product.images.split(',')[0];
    const showFreeDeliveryBadge = product.Store?.offersFreeDelivery;

    return (
        <Link href={`/product/${product.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    {/* Free Delivery Badge */}
                    {showFreeDeliveryBadge && (
                        <View style={styles.freeDeliveryBadge}>
                            <Text style={styles.badgeText}>🚚 Livraison Gratuite</Text>
                        </View>
                    )}

                    {/* Wishlist Button */}
                    <TouchableOpacity style={styles.wishlistButton}>
                        <Ionicons name="heart-outline" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Product Info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                        {product.title}
                    </Text>
                    <Text style={styles.storeName} numberOfLines={1}>
                        {product.Store?.name || 'Achrilik'}
                    </Text>
                    <Text style={styles.price}>
                        {product.price.toLocaleString('fr-DZ')} DA
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH * 1.2,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    freeDeliveryBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: 'rgba(0, 98, 51, 0.95)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    wishlistButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'white',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    info: {
        padding: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
        lineHeight: 18,
    },
    storeName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#006233',
    },
});
