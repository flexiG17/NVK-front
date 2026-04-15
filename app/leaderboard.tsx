import { ScrollView, View } from "react-native";
import { ImageBackground } from "expo-image";
import { makeStyles } from "@/lib/theme";
import { LeaderboardTabs } from "@/pages/leaderbord/widgets/LeaderboardTabs";
import { SearchInput } from "@/shared/ui/SearchInput";
import { PlaceInTheTop } from "@/pages/leaderbord/widgets/PlaceInTheTop";
import { RankingColumns } from "@/pages/leaderbord/widgets/RankingColumns";
import { LeaderboardItem } from "@/pages/leaderbord/widgets/LeaderboardItem";
import { useLeaderboardData } from "@/pages/leaderbord/hooks/useLeaderboardData";

export default function LeaderboardScreen() {
  const styles = useStyles();
  const { currentData, switchTab } = useLeaderboardData();

  const handleSearch = (text: string) => {
    console.log("Search:", text);
  };

  const handleTabChange = (tabIndex: number) => {
    switchTab(tabIndex);
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={require("@/assets/images/leaderboard-background.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <View style={styles.centerContent}>
          {/* LeaderboardTabs with data switching */}
          <LeaderboardTabs onTabChange={handleTabChange} />

          {/* SearchInput */}
          <SearchInput onSearch={handleSearch} />

          {/* PlaceInTheTop */}
          <PlaceInTheTop
            place={currentData.place}
            description={`Вы занимаете ${currentData.place}-е место!`}
          />

          {/* RankingColumns */}
          <RankingColumns users={currentData.topUsers} />

          {/* LeaderboardItem */}
          {currentData.leaderboard.map((item) => (
            <LeaderboardItem
              key={item.place}
              place={item.place}
              name={item.name}
              group={item.group}
              currency={item.currency}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  centerContent: {
    width: "100%",
    alignItems: "center",
  },
}));
