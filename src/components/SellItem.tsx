import { ISell } from "@/hooks/useSells";
import { StyleSheet, Text, View } from "react-native";

export default function SellItem(
    { createdAt, product, price, quantity }: Omit<ISell, 'userId' | 'id'>
) {
    const total = quantity * price;

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.product}>{product}</Text>
                <Text style={styles.date}>
                    {createdAt.toString().split(' ')[1]}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.quantity}>Qtd: {quantity}</Text>
                <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    product: {
        fontWeight: '600',
        fontSize: 16,
        color: '#222',
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    quantity: {
        fontSize: 14,
        color: '#444',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007bff',
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#28a745',
    },
});
