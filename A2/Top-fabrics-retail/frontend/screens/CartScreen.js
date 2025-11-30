import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function CartScreen({ cart }) {
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


return (
<ScrollView style={styles.container}>
<Text style={styles.heading}>Your Cart</Text>


{cart.map((item) => (
<View key={item.id} style={styles.itemBox}>
<Text style={styles.itemName}>{item.name}</Text>
<Text style={styles.price}>Rs. {item.price * item.qty}</Text>
</View>
))}


<View style={styles.totalBox}>
<Text style={styles.totalLabel}>Total</Text>
<Text style={styles.totalAmount}>Rs. {total}</Text>
</View>
</ScrollView>
);
}


const styles = StyleSheet.create({
container: { padding: 16, backgroundColor: '#fff' },
heading: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
itemBox: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 10, marginBottom: 10 },
itemName: { fontSize: 18, fontWeight: '600' },
price: { fontSize: 16, fontWeight: '700', color: '#1a73e8' },
totalBox: { marginTop: 20, padding: 12, backgroundColor: '#e8f0fe', borderRadius: 12 },
totalLabel: { fontSize: 18, fontWeight: '700' },
totalAmount: { fontSize: 18, fontWeight: '700', color: '#1a73e8' },
});