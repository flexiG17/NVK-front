import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;

  isEditMode: boolean;
  onToggleEditMode: () => void;
}

const MapControls: React.FC<ControlsProps> = ({ onZoomIn, onZoomOut, onReset, isEditMode, onToggleEditMode }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onZoomIn}>
        <Ionicons name="add" size={22} color="#000" />
      </Pressable>

      <Pressable style={styles.button} onPress={onZoomOut}>
        <Ionicons name="remove" size={22} color="#000" />
      </Pressable>

      <Pressable style={styles.button} onPress={onReset}>
        <Ionicons name="expand" size={22} color="#000" />
      </Pressable>

      {/* EDIT MODE TOGGLE */}
      <Pressable style={[styles.button, isEditMode && styles.activeButton, styles.last]} onPress={onToggleEditMode}>
        <Ionicons name={isEditMode ? 'checkmark-circle' : 'pencil'} size={22} color="#000" />
      </Pressable>
    </View>
  );
};

export default MapControls;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,

    zIndex: 9999,
    elevation: 10,
  },

  button: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },

  activeButton: {
    backgroundColor: '#e6f7ff',
  },

  last: {
    borderRightWidth: 0,
  },
});
