import { View, Text } from "react-native";
import { makeStyles } from "@/lib/theme";
import { fonts, palette } from "@/shared/config/theme";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { avatarIcon } from "@/assets/icons/avatar";
import { currencyIcon } from "@/assets/icons/currency";

interface UserRanking {
  name: string;
  amount: number;
  place?: number;
}

interface RankingColumnsProps {
  users: UserRanking[];
  maxAmount?: number;
}

export const RankingColumns = ({
  users,
  maxAmount = Math.max(...users.map((u) => u.amount)),
}: RankingColumnsProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {users.map((user, index) => {
        const columnHeight = (user.amount / maxAmount) * 120; // max height 120px
        return (
          <View key={index} style={styles.userColumn}>
            {/* User info */}
            <View style={styles.userInfo}>
              <View style={styles.avatarBox}>
                <SvgXml xml={avatarIcon} width={60} height={60} />
              </View>

              <Text style={styles.nameText}>{user.name}</Text>

              <View style={styles.amountContainer}>
                <SvgXml xml={currencyIcon} width={14} height={13} />
                <Text style={styles.amountText}>{user.amount}</Text>
              </View>
            </View>

            {/* Gradient column directly below */}
            <View style={[styles.columnWrapper, { height: columnHeight }]}>
              <LinearGradient
                colors={["#FF011B", "#FF0189", "#FF911E", "#FFEB00"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.column}
              />
              {user.place !== undefined && (
                <Text style={styles.placeNumber}>{user.place}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
  },
  userColumn: {
    alignItems: "center",
    height: 280,
    justifyContent: "space-between",
    flex: 1,
  },
  userInfo: {
    alignItems: "center",
    gap: 4,
    minHeight: 140,
    justifyContent: "center",
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: palette.white,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  amountText: {
    fontSize: fonts.sizes.sm,
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
  columnWrapper: {
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
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
}));
