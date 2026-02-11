import { View, Text, StyleSheet } from 'react-native';

interface FreeDeliveryBadgeProps {
    threshold: number;
    currentAmount?: number;
    variant?: 'compact' | 'full';
}

export default function FreeDeliveryBadge({
    threshold,
    currentAmount = 0,
    variant = 'compact'
}: FreeDeliveryBadgeProps) {
    const isEligible = currentAmount >= threshold;
    const remaining = threshold - currentAmount;

    if (variant === 'compact') {
        return (
            <View style={styles.compactBadge}>
                <Text style={styles.compactText}>🚚 Livraison Gratuite</Text>
            </View>
        );
    }

    return (
        <View style={[styles.fullBanner, isEligible ? styles.eligible : styles.progress]}>
            <Text style={styles.icon}>🚚</Text>
            <View style={styles.textContainer}>
                {isEligible ? (
                    <>
                        <Text style={styles.title}>Félicitations ! 🎉</Text>
                        <Text style={styles.subtitle}>
                            Livraison gratuite activée
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>
                            Plus que {remaining.toLocaleString()} DA
                        </Text>
                        <Text style={styles.subtitle}>
                            pour la livraison gratuite !
                        </Text>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    compactBadge: {
        backgroundColor: 'rgba(0, 98, 51, 0.95)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    compactText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    fullBanner: {
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    eligible: {
        backgroundColor: '#e8f5e9',
    },
    progress: {
        backgroundColor: '#fff3e0',
    },
    icon: {
        fontSize: 32,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006233',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
});
