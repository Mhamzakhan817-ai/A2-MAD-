import { TextInput, StyleSheet } from 'react-native';


export default function AppInput({ ...props }) {
return <TextInput style={styles.input} {...props} />;
}


const styles = StyleSheet.create({
input: {
padding: 14,
backgroundColor: '#f2f2f2',
borderRadius: 10,
marginBottom: 12,
},
});