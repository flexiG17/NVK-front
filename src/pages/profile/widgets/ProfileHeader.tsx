import { View, Text, Image } from 'react-native';
import { makeStyles, useTheme } from '@/lib/theme';
import { fonts } from '@/shared/config/theme/fonts';
import { palette } from '@/shared/config/theme/colors/palette';
import { useLocalization } from '@/shared/lib/i18n';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import AvatarIcon from '@/assets/icons/avatar.svg';

const AVATAR_SIZE = 124;
const AVATAR_BORDER_RADIUS = AVATAR_SIZE / 2;
const PROGRESS_BAR_HEIGHT = 12;
const ANIMATION_DURATION = 800;

interface ProfileHeaderProps {
  userName: string;
  level: number;
  currentPoints: number;
  maxPoints: number;
  userImage?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, level, currentPoints, maxPoints, userImage }) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const { t } = useLocalization();
  const progressPercentage = (currentPoints / maxPoints) * 100;

  return (
    <View style={styles.container}>
      {/* User Avatar */}
      <View style={styles.avatarContainer}>
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <AvatarIcon width={AVATAR_SIZE} height={AVATAR_SIZE} color={theme.colors.accent} />
          </View>
        )}
      </View>

      <Text style={styles.greeting}>
        {t('profile.greeting')}, {userName}!
      </Text>

      <View style={styles.levelSection}>
        <Text style={styles.levelLabel}>
          {t('profile.level')} {level}
        </Text>
      </View>

      <View style={styles.pointsSection}>
        <Text style={styles.pointsText}>
          {currentPoints}/{maxPoints} {t('profile.points')}
        </Text>

        <View style={styles.progressBarContainer}>
          <ProgressBar
            percent={progressPercentage}
            type="gradient"
            height={PROGRESS_BAR_HEIGHT}
            animationDuration={ANIMATION_DURATION}
          />
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: palette.white,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    marginBottom: 3,
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_BORDER_RADIUS,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    backgroundColor: theme.colors.accent,
  },
  greeting: {
    fontSize: 28,
    fontFamily: fonts.family.semibold,
    color: theme.colors.greetingText,
    marginBottom: 9,
  },
  levelSection: {
    marginBottom: 9,
  },
  levelLabel: {
    fontSize: 20,
    fontFamily: fonts.family.regular,
    color: theme.colors.greetingText,
  },
  pointsSection: {
    gap: 3,
    width: '100%',
  },
  pointsText: {
    fontSize: 15,
    fontFamily: fonts.family.regular,
    color: theme.colors.greetingText,
  },
  progressBarContainer: {
    overflow: 'hidden',
    borderRadius: 6,
  },
}));
