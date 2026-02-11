import { View, Text, ScrollView, StyleSheet, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import ProductCard from '@/components/ProductCard';
import FreeDeliveryBadge from '@/components/FreeDeliveryBadge';
import { useProducts } from '@/hooks/useProducts';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const { data: products, isLoading, error } = useProducts();

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>Achrilik</Text>
                <Text style={styles.tagline}>Shopping en Ligne Algérie</Text>
            </View>

            {/* Hero Section */}
            <View style={styles.hero}>
                <Text style={styles.heroTitle}>Bienvenue ! 👋</Text>
                <Text style={styles.heroSubtitle}>
                    Découvrez des milliers de produits
                </Text>
            </View>

            {/* Categories Grid */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Catégories</Text>
                <View style={styles.categoriesGrid}>
                    {['Femme', 'Homme', 'Enfant', 'Maison'].map((cat) => (
                        <View key={cat} style={styles.categoryCard}>
                            <Text style={styles.categoryName}>{cat}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Free Delivery Banner */}
            <View style={styles.bannerContainer}>
                <FreeDeliveryBadge
                    threshold={8000}
                    currentAmount={0}
                    variant="full"
                />
            </View>

            {/* Products Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nouveautés</Text>

                {isLoading && (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#006233" />
                        <Text style={styles.loadingText}>Chargement...</Text>
                    </View>
                )}

                {error && (
                    <View style={styles.error}>
                        <Text style={styles.errorText}>
                            Erreur de chargement. Vérifiez votre connexion.
                        </Text>
                    </View>
                )}

                {products && products.length > 0 && (
                    <View style={styles.productsGrid}>
                        {products.slice(0, 10).map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </View>
                )}

                {products && products.length === 0 && (
                    <Text style={styles.comingSoon}>Aucun produit disponible</Text>
                )}
            </View>
        </ScrollView>
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
        alignItems: 'center',
    },
    logo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    tagline: {
        fontSize: 12,
        color: '#d0d0d0',
        marginTop: 4,
    },
    hero: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    section: {
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    categoryCard: {
        width: (width - 56) / 2,
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    bannerContainer: {
        paddingHorizontal: 16,
        marginVertical: 12,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    loading: {
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    error: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 14,
        color: '#d32f2f',
        textAlign: 'center',
    },
    comingSoon: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingVertical: 20,
    },
});
