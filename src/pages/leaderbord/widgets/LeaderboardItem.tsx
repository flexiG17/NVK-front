import { View, Text, Image } from "react-native";
import { makeStyles } from "@/lib/theme";
import { fonts, palette } from "@/shared/config/theme";
import AvatarIcon from "@/assets/icons/avatar.svg";
import CurrencyIcon from "@/assets/icons/currency.svg";

interface LeaderboardItemProps {
  place: number;
  name: string;
  group: string;
  currency: number;
  avatar?: string;
}

export const LeaderboardItem = ({
  place,
  name,
  group,
  currency,
  avatar,
}: LeaderboardItemProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* Place number */}
      <Text style={styles.placeNumber}>{place}</Text>

      {/* Avatar */}
      <View style={styles.avatarBox}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
        ) : (
          <AvatarIcon width={32} height={32} color={palette.gray600} />
        )}
      </View>

      {/* User info */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.groupText}>{group}</Text>
      </View>

      {/* Currency badge */}
      <View style={styles.currencyBadge}>
        <CurrencyIcon width={14} height={14} color={palette.white} />
        <Text style={styles.currencyText}>{currency}</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginBottom: 8,
    minHeight: 64,
  },
  placeNumber: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family.bold,
    color: theme.colors.textPrimary,
    width: 30,
    textAlign: "center",
  },
  avatarBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: palette.light100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  infoContainer: {
    flex: 1,
    gap: 2,
  },
  nameText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family.regular,
    color: theme.colors.textPrimary,
  },
  groupText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family.regular,
    color: theme.colors.textPrimary,
    opacity: 0.7,
  },
  currencyBadge: {
    backgroundColor: palette.navyMedium,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currencyText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family.semibold,
    color: palette.white,
  },
}));
