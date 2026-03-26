import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={64} color="#ccc" />
      <Text style={styles.title}>Карта</Text>
      <Text style={styles.subtitle}>Здесь будет интерактивная карта с объектами</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  subtitle: { 
    color: 'gray', 
    marginTop: 5 
  },
});