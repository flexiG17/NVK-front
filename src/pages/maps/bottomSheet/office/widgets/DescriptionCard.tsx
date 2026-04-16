// DescriptionCard.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { makeStyles } from "@/lib/theme";
import { useLocalization } from '@/shared/lib/i18n/useLocalization';


interface DescriptionCardProps {
  description: string;
  status: 'open' | 'closed';
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({ description, status }) => {
  const styles = useStyles();
  const { t } = useLocalization();
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text
          style={[
            styles.status,
            { color: status === 'open' ? 'green' : '#EF302B' },
          ]}
        >
          {status === 'open' ? t('navigation.office.openStatus') : t('navigation.office.closedStatus')}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

DescriptionCard.displayName = 'DescriptionCard';

const useStyles = makeStyles((t) => ({
  wrapper: {
    overflow: 'hidden', 
    // paddingHorizontal: 16, 
    marginBottom: 12, 
    width: '100%', 
    alignSelf: 'stretch',
  },
  card: {
    // backgroundColor: '#FFFFFF',
    backgroundColor: t.colors.surface,
    borderRadius: t.borderRadius.lg,
    padding: 14,
    justifyContent: 'center',
    // width: '100%',
  },
  status: { 
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.semibold, 

  },
  description: { 
    fontSize: t.fonts.sizes.md, 
    fontFamily: t.fonts.family.semibold, 
    color: t.colors.textPrimary,
  },
}));