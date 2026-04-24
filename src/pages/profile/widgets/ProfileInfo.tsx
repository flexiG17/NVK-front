import { View, Text } from 'react-native';
import { makeStyles } from '@/lib/theme';
import { fonts } from '@/shared/config/theme/fonts';
import { palette } from '@/shared/config/theme/colors/palette';
import { useLocalization } from '@/shared/lib/i18n';
import { LinearGradient } from 'expo-linear-gradient';

interface UserInfo {
  fio: string;
  group: string;
  institute: string;
  instituteIcon?: string;
  role: string;
  organization?: string;
}

interface ProfileInfoProps {
  userInfo: UserInfo;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ userInfo }) => {
  const styles = useStyles();
  const { t } = useLocalization();

  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={['#FF2C2F', '#FF0189', '#FF8329', '#FFE70E']}
        locations={[0, 0.25, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Text style={styles.headerText}>{t('profile.activities')}</Text>
      </LinearGradient>

      {/* FIO Field */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('profile.labels.fio')}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userInfo.fio}</Text>
        </View>
      </View>

      {/* Group Field */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('profile.labels.group')}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userInfo.group}</Text>
        </View>
      </View>

      {/* Institute Field */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('profile.labels.institute')}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userInfo.institute}</Text>
        </View>
      </View>

      {/* Role Field */}
      <View style={styles.section}>
        <Text style={styles.label}>{t('profile.labels.role')}</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldValue}>{userInfo.role}</Text>
        </View>
      </View>

      {/* Organization Field */}
      {userInfo.organization && (
        <View style={styles.section}>
          <Text style={styles.label}>{t('profile.labels.organization')}</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldValue}>{userInfo.organization}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 18,
    paddingRight: 23,
    paddingVertical: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: theme.colors.greetingText,
    paddingBottom: 80,
  },
  headerGradient: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 23,
    marginBottom: 34,
    height: 44,
  },
  headerText: {
    fontSize: 15,
    fontFamily: fonts.family.semibold,
    color: palette.white,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: fonts.sizes.lg,
    fontFamily: fonts.family.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  fieldContainer: {
    backgroundColor: palette.blue,
    borderRadius: 87,
    paddingLeft: 18,
    paddingRight: 23,
    paddingVertical: 12,
    height: 44,
  },

  fieldValue: {
    fontSize: 13,
    fontFamily: fonts.family.regular,
    color: theme.colors.textPrimary,
  },
}));
