// CardScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardHeader } from './CardHeader';
import { SegmentedControl } from './SegmentedControl';
import { DescriptionCard } from './DescriptionCard';
import { PhotoCarousel } from './PhotoCarousel';
import { useLocalization } from '@/shared/lib/i18n/useLocalization';
import { AnimatedSwitcher } from './AnimatedSwitcher';
import { PrimaryButton } from '@/shared/ui';



interface CardScreenProps {
  id: string;
}

export const CardScreen: React.FC<CardScreenProps> = ({ id }) => {
  const { t } = useLocalization();
  const [selectedTab, setSelectedTab] = useState<'description' | 'photos'>('description');

  const handleBack = () => {
  }
  
  const photo = [
    { uri: 'https://picsum.photos/400/300' },
    { uri: 'https://picsum.photos/401/300' },
    { uri: 'https://picsum.photos/402/300' }, 
    { uri: 'https://picsum.photos/400/300' },
    { uri: 'https://picsum.photos/401/300' },
    { uri: 'https://picsum.photos/402/300' }, 
    { uri: 'https://picsum.photos/400/300' },
    { uri: 'https://picsum.photos/401/300' },
    { uri: 'https://picsum.photos/402/300' }
  ]

  return (
    <View style={styles.container} >
        <View style={styles.sheetContent}>
          <CardHeader number='Р-101' room={t("navigation.office.name")} />
           <SegmentedControl
            options={[t("description"), t("photos")]}
            selected={selectedTab}
            onChange={(index) => setSelectedTab(index === 0 ? 'description' : 'photos')}
          />
          <View
            style={{
              minHeight: 120, 
            }}
          >
            <AnimatedSwitcher
              active={selectedTab}
              description={
                <DescriptionCard
                  description={t("navigation.office.roomDetail.P101")}
                  status={"open"}
                />
              }
              photos={
                <PhotoCarousel photos={photo} />
              }
            />
          </View>
          <PrimaryButton
            title={t("route")}
            onPress={handleBack}
          />
          
        </View>
    </View>
  );
};

CardScreen.displayName = 'CardScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContent: {
    padding: 16,
  },
});