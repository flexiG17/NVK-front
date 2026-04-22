import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ObjectItem } from '../model/types';

interface Props {
  open: boolean;
  onClose: () => void;
  object: ObjectItem | null;
  objectNavigation: () => void;
}

const ObjectItemDetailsDialog: React.FC<Props> = ({ open, onClose, object, objectNavigation }) => {
  if (!object) return null;

  return (
    <Modal visible={open} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.category}>{object.categoryName}</Text>
          <Text style={styles.name}>{object.name}</Text>
          <Text style={styles.desc}>{object.desc}</Text>
          <Pressable style={styles.button} onPress={objectNavigation}>
            <Ionicons name="navigate" size={22} color="#fff" />
          </Pressable>
          <Pressable style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={22} color="#000" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ObjectItemDetailsDialog;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },

  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
  },

  button: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 999,
  },

  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
});
