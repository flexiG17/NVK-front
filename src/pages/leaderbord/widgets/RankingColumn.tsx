import { View, Text } from "react-native";
import { makeStyles } from "@/lib/theme";
import { fonts, palette } from "@/shared/config/theme";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";
import { avatarIcon } from "@/assets/icons/avatar";
import { currencyIcon } from "@/assets/icons/currency";

interface RankingColumnProps {
  name: string;
  amount: number;
  avatar?: string;
  maxAmount?: number;
}

export const RankingColumn = ({
  name,
  amount,
  avatar,
  maxAmount = 1000,
}: RankingColumnProps) => {
  const styles = useStyles();
  const heightPercent = Math.min((amount / maxAmount) * 100, 100);
  const columnHeight = (heightPercent / 100) * 120; // max height 120px

  return (
    <View style={styles.container}>
      {/* First row: Avatar, Name, and Amount stacked vertically */}
      <View style={styles.firstRow}>
        <View style={styles.avatarBox}>
          <SvgXml xml={avatarIcon} width={60} height={60} />
        </View>

        <Text style={styles.nameText} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.amountContainer}>
          <SvgXml xml={currencyIcon} width={14} height={13} />
          <Text style={styles.amountText}>{amount}</Text>
        </View>
      </View>

      {/* Second row: Gradient column */}
      <LinearGradient
        colors={["#FF011B", "#FF0189", "#FF911E", "#FFEB00"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.column, { height: columnHeight }]}
      />
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    justifyContent: "space-between",
    minWidth: 0,
  },
  firstRow: {
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
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
  },
  amountText: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family.bold,
    color: "#2F3E90",
  },
  column: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  nameText: {
    fontSize: fonts.sizes.xs,
    fontFamily: fonts.family.medium,
    color: palette.dark900,
    textAlign: "center",
  },
}));
