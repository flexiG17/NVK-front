import { View, StyleSheet } from 'react-native';
import { useRef } from 'react';
import {
  CustomBottomSheet,
  CustomBottomSheetRef,
} from '@/pages/maps/bottomSheet/office/widgets/CustomBottomSheet';
import { CardScreen } from '@/pages/maps/bottomSheet/office/widgets/CardScreen';
import IndoorMapWrapper from '@/pages/maps/indoorMap/IndoorMapWrapper';

export default function MapScreen() {
  const sheetRef = useRef<CustomBottomSheetRef>(null);

  return (
    <View style={styles.container}>
      <IndoorMapWrapper />

      <CustomBottomSheet ref={sheetRef}>
        <CardScreen id="1" />
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: 'gray',
    marginTop: 5,
  },
  sheetContent: {
    padding: 16,
  },
});
