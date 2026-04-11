import { View } from "react-native";
import { LeaderboardTabs } from "@/pages/leaderbord/widgets/LeaderboardTabs";
import { SearchInput } from "@/shared/ui/SearchInput";

export default function GuestScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8a8a8a",
        paddingHorizontal: 20,
      }}
    >
      <LeaderboardTabs />
      <SearchInput
        placeholder="Поиск по ФИО"
        onSearch={(text) => console.log(text)}
      />
    </View>
  );
}
