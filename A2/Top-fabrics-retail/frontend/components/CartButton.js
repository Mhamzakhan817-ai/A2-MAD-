import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function CartButton({ onPress }) {
return (
<TouchableOpacity style={styles.button} onPress={onPress}>
<Text style={styles.text}>Add to Cart</Text>
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
button: {
backgroundColor: '#1a73e8',
padding: 14,
borderRadius: 12,
alignItems: 'center',
marginTop: 10,
},
text: {
color: '#fff',
fontSize: 16,
fontWeight: '700',
},
});