import { TouchableOpacity, Text, StyleSheet } from 'react-native';


export default function AppButton({ title, onPress }) {
return (
<TouchableOpacity style={styles.btn} onPress={onPress}>
<Text style={styles.text}>{title}</Text>
</TouchableOpacity>
);
}


const styles = StyleSheet.create({
btn: {
padding: 14,
backgroundColor: '#1a73e8',
borderRadius: 12,
alignItems: 'center',
},
text: {
color: '#fff',
fontSize: 16,
fontWeight: '700',
},
});