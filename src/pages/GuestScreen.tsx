import { View } from "react-native";
import { ContestDeadline } from "@/shared/ui/ContestDeadline";
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
      <ContestDeadline />
      <SearchInput placeholder="Поиск по ФИО" onSearch={(text) => console.log(text)} />
    </View>
  );
}
