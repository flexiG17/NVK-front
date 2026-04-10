// PhotoCarousel.tsx
import { makeStyles } from '@/lib/theme';
import React from 'react';
import { Image, ImageSourcePropType, ScrollView, View } from 'react-native';

interface PhotoCarouselProps {
  photos: ImageSourcePropType[]
}

const ITEM_SIZE = 120;
const GAP = 12;
const SIDE_PADDING = 4;

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ photos }) => {
  const styles = useStyles();
  return (
    <View style={{ width: "100%", overflow: 'hidden' }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: SIDE_PADDING,
          paddingRight: SIDE_PADDING,
        }}
      >
        {photos.map((photo, i) => (
          <View
            key={i}
            style={{ marginRight: i === photos.length - 1 ? 0 : GAP }}
          >
            <Image source={photo} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

PhotoCarousel.displayName = 'PhotoCarousel';

const useStyles = makeStyles((t) => ({
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 20,
  },
}));