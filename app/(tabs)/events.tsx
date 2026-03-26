import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EventsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ближайшие события</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Список мероприятий пуст...</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#f9f9f9' 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20 
  },
  card: { 
    padding: 40, 
    backgroundColor: '#fff', 
    borderRadius: 15, 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#ddd', 
    alignItems: 'center' 
  },
  cardText: { 
    color: '#aaa' 
  }
});