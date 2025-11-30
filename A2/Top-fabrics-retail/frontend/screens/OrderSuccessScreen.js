// screens/OrderSuccessScreen.js
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OrderSuccessScreen({ onHome }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉</Text>

      <Text style={styles.title}>Order Placed Successfully!</Text>

      <Text style={styles.message}>
        Thank you for shopping at Top Fabrics Retail.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#1a73e8',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
