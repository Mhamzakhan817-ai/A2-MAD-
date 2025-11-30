import { ScrollView, Text, StyleSheet } from 'react-native';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductGrid from '../components/ProductGrid';


export default function HomeScreen({ featured, products }) {
return (
<ScrollView style={styles.container}>
<Text style={styles.heading}>Top Fabrics Retail</Text>
<FeaturedCarousel featured={featured} />
<ProductGrid products={products} />
</ScrollView>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 16, backgroundColor: '#fff' },
heading: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
});