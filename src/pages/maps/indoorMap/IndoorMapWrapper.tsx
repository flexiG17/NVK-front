import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import PanZoom, { PanZoomHandle } from './lib/PanZoom';
import db from './model/db.json';
import { ObjectItem, Navigation } from './model/types';
import { navigateToObject } from './model/navigationHelper';
import Objects from './ui/Objects';
import Paths from './ui/Paths';
import Positions from './ui/Positions';
import ObjectItemDetailsDialog from './ui/ObjectItemDetailsDialog';
import { MapSvg } from './ui/MapSvg';
import Svg from 'react-native-svg';
import MapControls from './ui/MapControls';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IndoorMapWrapper: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem | null>(null);

  const [navigation, setNavigation] = useState<Navigation>({
    start: 'v35',
    end: '',
  });

  const panZoomRef = useRef<PanZoomHandle>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const objects: ObjectItem[] = db.objects;
  const positionRadius = 10;

  const handleObjectClick = (id: string) => {
    if (!isEditMode) {
      const selected = objects.find(obj => obj.name === id);

      if (selected) {
        setObject(selected);
        setModalOpen(true);
      } else {
        Alert.alert('Error', 'Object not found');
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const handlePositionClick = (id: string) => {
    if (isEditMode) {
      setNavigation({
        start: id,
        end: '',
        path: [],
      });

      setIsEditMode(false);
    }
  };

  const handleNavigationClick = () => {
    if (!object) return;

    setModalOpen(false);
    navigateToObject(object.name, navigation, setNavigation);
  };

  return (
    <View style={styles.container}>
      <ObjectItemDetailsDialog
        open={modalOpen}
        object={object}
        onClose={() => setModalOpen(false)}
        objectNavigation={handleNavigationClick}
      />

      <PanZoom ref={panZoomRef}>
        <View style={{ width: '100%', height: '100%' }}>
          <Svg
            width={screenWidth} // TODO костыльно задается положение на экране
            height={screenHeight} // TODO костыль, потом переделать
            viewBox="0 0 360 426"
          >
            <MapSvg width={360} height={426} />
            <Objects onPress={handleObjectClick} disabled={isEditMode} />

            <Paths path={navigation.path} />
            <Positions
              positionRadius={positionRadius}
              onPress={handlePositionClick}
              visible={isEditMode}
              navigation={navigation}
            />
          </Svg>
        </View>
      </PanZoom>
      <MapControls
        onZoomIn={() => panZoomRef.current?.zoomIn()}
        onZoomOut={() => panZoomRef.current?.zoomOut()}
        onReset={() => panZoomRef.current?.reset()}
        isEditMode={isEditMode}
        onToggleEditMode={toggleEditMode}
      />
    </View>
  );
};

export default IndoorMapWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
