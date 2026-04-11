import { View } from "react-native";
import { LeaderboardTabs } from "@/pages/leaderbord/widgets/LeaderboardTabs";
import { PlaceInTheTop } from "@/pages/leaderbord/widgets/PlaceInTheTop";
import { RankingColumns } from "@/pages/leaderbord/widgets/RankingColumns";
import { LeaderboardItem } from "@/pages/leaderbord/widgets/LeaderboardItem";
import { SearchInput } from "@/shared/ui/SearchInput";

export default function GuestScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#8a8a8a",
        paddingHorizontal: 20,
      }}
    >
      <View>
        <LeaderboardTabs />
        <PlaceInTheTop
          place={43}
          description="Ты на 43 месте, так держать!
Твой результат лучше чем у 63% участников"
        />
      </View>
      <View
        style={{
          marginVertical: 20,
        }}
      >
        <RankingColumns
          users={[
            { name: "Фамилия Имя", amount: 234 },
            {
              name: "Фамилия Имя",
              amount: 543,
              avatar: "https://i.pravatar.cc/60?img=1",
            },
            { name: "Фамилия Имя", amount: 210 },
          ]}
        />
      </View>
      <View>
        <LeaderboardItem
          place={4}
          name="Фамилия Имя"
          group="РИ-150932"
          currency={209}
        />
        <LeaderboardItem
          place={5}
          name="Фамилия Имя"
          group="РИ-150932"
          currency={187}
        />
        <SearchInput
          placeholder="Поиск по ФИО"
          onSearch={(text) => console.log(text)}
        />
      </View>
    </View>
  );
}
