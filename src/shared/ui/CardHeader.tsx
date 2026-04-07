// CardHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { makeStyles } from "@/lib/theme";
import { Entypo } from '@expo/vector-icons';

interface CardHeaderProps {
  number: string;
  room: string;
  onBack?: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ number, room, onBack }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={onBack}>
        <Entypo name="chevron-small-left" size={16} color="black" />
        <Text style={styles.backText}>назад</Text>
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.room}>{room}</Text>
      </View>
    </View>
  );
};

CardHeader.displayName = 'CardHeader';

const useStyles = makeStyles((t) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  back: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  backText: {
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.regular, 
  },

  center: {
    alignItems: 'center',
  },

  number: {
    fontSize: t.fonts.sizes.lg, 
    fontFamily: t.fonts.family.semibold, 
  },

  room: {
    color: '#666',
    fontSize: t.fonts.sizes.sm, 
    fontFamily: t.fonts.family.regular, 
  },
}));