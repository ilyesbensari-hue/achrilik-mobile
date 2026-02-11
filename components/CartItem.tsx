import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CartItemProps {
    item: {
        id: string;
        quantity: number;
        product: {
            id: string;
            title: string;
            price: number;
            images: string;
            Store?: {
                name: string;
            };
        };
    };
    onUpdateQuantity: (itemId: string, newQuantity: number) => void;
    onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const image = item.product.images.split(',')[0];
    const subtotal = item.product.price * item.quantity;

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Info */}
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                    {item.product.title}
                </Text>
                <Text style={styles.storeName}>{item.product.Store?.name}</Text>
                <Text style={styles.price}>
                    {item.product.price.toLocaleString('fr-DZ')} DA
                </Text>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    >
                        <Ionicons name="remove" size={16} color="#666" />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <Ionicons name="add" size={16} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <Text style={styles.subtotal}>
                    {subtotal.toLocaleString('fr-DZ')} DA
                </Text>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemove(item.id)}
                >
                    <Ionicons name="trash-outline" size={20} color="#d32f2f" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 8,
        borderRadius: 12,
        gap: 12,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    storeName: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006233',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 20,
        textAlign: 'center',
    },
    actions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    subtotal: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    removeButton: {
        padding: 8,
    },
});
