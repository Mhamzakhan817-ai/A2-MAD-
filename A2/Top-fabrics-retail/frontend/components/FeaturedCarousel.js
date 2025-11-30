import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


export default function FeaturedCarousel({ featured }) {
return (
<View style={styles.container}>
<Text style={styles.heading}>Featured Fabrics</Text>


<ScrollView horizontal showsHorizontalScrollIndicator={false}>
{featured.map((item) => (
<View key={item._id} style={styles.card}>
<Image source={{ uri: item.image_url }} style={styles.image} />
<Text style={styles.name}>{item.name}</Text>
</View>
))}
</ScrollView>
</View>
);
}


const styles = StyleSheet.create({
container: {
marginBottom: 20,
},
heading: {
fontSize: 20,
fontWeight: '700',
marginBottom: 10,
},
card: {
marginRight: 12,
width: 150,
},
image: {
width: '100%',
height: 100,
borderRadius: 10,
},
name: {
marginTop: 5,
fontWeight: '600',
},
});