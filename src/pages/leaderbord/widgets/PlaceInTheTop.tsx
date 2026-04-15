import { View, Text } from "react-native";
import { makeStyles } from "@/lib/theme";
import { fonts, palette } from "@/shared/config/theme";



interface PlaceInTheTopProps {
  place: number;
  description: string;
}

export const PlaceInTheTop = ({
  place,
  description,
}: PlaceInTheTopProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.placeContainer}>
          <Text style={styles.placeNumber}>{place}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: palette.pink,
    borderRadius: theme.borderRadius.md,
    padding: 16,
    marginVertical: 12,
    marginTop: 17,
    marginBottom: 30,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  placeContainer: {
    width: 48,
    height: 44,
    borderRadius: 12,
    backgroundColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
  },
  placeNumber: {
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.family.bold,
    color: "#343d8f",
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  description: {
    fontSize: fonts.sizes.sm,
    fontFamily: fonts.family.semibold,
    color: palette.white,
  },
}));
