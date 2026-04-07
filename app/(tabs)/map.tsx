import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CardScreen } from '@/shared/ui/CardScreen';
import { CustomBottomSheet, CustomBottomSheetRef } from '@/shared/ui';
import { useRef } from 'react';

export default function MapScreen() {
  const sheetRef = useRef<CustomBottomSheetRef>(null);

  return (
    <View style={styles.container}>
      <Ionicons name="map-outline" size={64} color="#ccc" />
      <Text style={styles.title}>Карта</Text>
      <Text style={styles.subtitle}>Здесь будет интерактивная карта с объектами</Text>
    
      <CustomBottomSheet ref={sheetRef}> 
        <CardScreen id='1'/>  
      </CustomBottomSheet>
      
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
  sheetContent: {
    padding: 16,
  },

});