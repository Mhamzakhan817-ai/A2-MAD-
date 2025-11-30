import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function WishlistScreen({ wishlist }) {
return (
<ScrollView style={styles.container}>
<Text style={styles.heading}>Wishlist</Text>


{wishlist.map((item) => (
<View key={item.id} style={styles.itemBox}>
<Text style={styles.itemName}>{item.name}</Text>
<TouchableOpacity style={styles.btn}>
<Text style={styles.btnText}>Add to Cart</Text>
</TouchableOpacity>
</View>
))}
</ScrollView>
);
}


const styles = StyleSheet.create({
container: { padding: 16, backgroundColor: '#fff' },
heading: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
itemBox: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f2f2f2', borderRadius: 10, marginBottom: 12 },
itemName: { fontSize: 18, fontWeight: '600' },
btn: { backgroundColor: '#1a73e8', padding: 10, borderRadius: 10 },
btnText: { color: '#fff', fontWeight: '700' },
});