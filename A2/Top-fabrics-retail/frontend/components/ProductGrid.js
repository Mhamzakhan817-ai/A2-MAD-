import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';


export default function ProductGrid({ products, onSelect }) {
return (
<FlatList
data={products}
numColumns={2}
keyExtractor={(item) => item._id}
renderItem={({ item }) => (
<ProductCard item={item} onPress={() => onSelect(item)} />
)}
contentContainerStyle={styles.grid}
/>
);
}


const styles = StyleSheet.create({
grid: {
justifyContent: 'space-between',
},
});