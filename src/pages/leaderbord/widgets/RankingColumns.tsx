import { View, Text, Image } from "react-native";
import { makeStyles } from "@/lib/theme";
import { fonts, palette } from "@/shared/config/theme";
import {
  rankingColumnsGradient,
  rankingColumnsLocations,
} from "@/shared/config/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import AvatarIcon from "@/assets/icons/avatar.svg";
import CurrencyIcon from "@/assets/icons/currency.svg";

interface UserRanking {
  name: string;
  amount: number;
  avatar?: string;
}

interface RankingColumnsProps {
  users: UserRanking[];
}

export const RankingColumns = ({ users }: RankingColumnsProps) => {
  const styles = useStyles();

  // Sort users by amount in descending order
  const sortedUsers = [...users].sort((a, b) => b.amount - a.amount);

  // Get top 3 users
  const topThree = sortedUsers.slice(0, 3);

  const renderUserColumn = (user: UserRanking, rank: number) => (
    <View key={rank} style={styles.userColumn}>
      {/* User info */}
      <View style={styles.userInfo}>
        <View style={styles.avatarBox}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <AvatarIcon width={60} height={60} color={palette.gray600} />
          )}
        </View>

        <Text style={styles.nameText}>{user.name}</Text>

        <View style={styles.amountContainer}>
          <CurrencyIcon
            width={14}
            height={13}
            color={palette.navyMedium}
            style={{ flexShrink: 0 }}
          />
          <Text style={styles.amountText}>{user.amount}</Text>
        </View>
      </View>

      {/* Gradient column directly below */}
      <View style={styles.columnContainer}>
        <View
          style={[styles.columnWrapper, { height: [80, 60, 45][rank - 1] }]}
        >
          <LinearGradient
            colors={rankingColumnsGradient}
            locations={rankingColumnsLocations}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.column}
          />
          <View style={styles.overlayWhite} />
          <Text style={styles.placeNumber}>{rank}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* 2nd place - left */}
        {topThree[1] ? (
          renderUserColumn(topThree[1], 2)
        ) : (
          <View style={styles.placeholderColumn} />
        )}

        {/* 1st place - center */}
        {topThree[0] ? renderUserColumn(topThree[0], 1) : null}

        {/* 3rd place - right */}
        {topThree[2] ? (
          renderUserColumn(topThree[2], 3)
        ) : (
          <View style={styles.placeholderColumn} />
        )}
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 28,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  userColumn: {
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 80,
    flexDirection: "column",
  },
  placeholderColumn: {
    flex: 1,
    minWidth: 80,
  },
  userInfo: {
    alignItems: "center",
    gap: 4,
    justifyContent: "center",
    flexShrink: 0,
  },
  columnContainer: {
    height: 80,
    justifyContent: "flex-end",
    width: "100%",
  },
  columnWrapper: {
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 61,
    backgroundColor: palette.white,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  amountText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family.regular,
    color: palette.dark900,
  },
  nameText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family.semibold,
    color: palette.white,
    maxWidth: 80,
    textAlign: "center",
  },
  column: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeNumber: {
    position: "absolute",
    fontSize: 24,
    fontFamily: fonts.family.bold,
    color: "#262626",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -6 }, { translateY: -12 }],
    zIndex: 1,
  },
  overlayWhite: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 0,
  },
}));
