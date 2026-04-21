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
import MapNavigationControls from "./ui/MapNavigationControls";

const screenWidth = Dimensions.get('window').width;

const IndoorMapWrapper: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [object, setObject] = useState<ObjectItem | null>(null);

  const [navigation, setNavigation] = useState<Navigation>({
    start: 'v35',
    end: '',
  });

  const panZoomRef = useRef<PanZoomHandle>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [currentScale, setCurrentScale] = useState(1);
  const objects: ObjectItem[] = db.objects;
  const positionRadius = 10;

  const handleObjectClick = (id: string) => {
    if (!isEditMode) {
      const selected = objects.find((obj) => obj.name === id);

      if (selected) {
        setObject(selected);
        setModalOpen(true);
      } else {
        Alert.alert('Error', 'Object not found');
      }
    }
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
            width={1461.95 / (1461.95 / screenWidth)} // TODO костыльно задается положение на экране
            height={1149.136 / 3} // TODO костыль, потом переделать
            viewBox="0 0 1461.95 1149.136">
            <MapSvg width={1461.95} height={1149.136} />
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
      <MapNavigationControls
        onZoomIn={() => panZoomRef.current?.zoomIn()}
        onZoomOut={() => panZoomRef.current?.zoomOut()}
        onLocate={() => {
          panZoomRef.current?.reset();
          setCurrentScale(1);
        }}
        scale={{ min: 0.5, max: 3, current: currentScale }}
        onScaleChange={setCurrentScale}
        floorList={[1, 2, 3, 4]}
        currentFloor={currentFloor}
        onFloorChange={setCurrentFloor}
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
