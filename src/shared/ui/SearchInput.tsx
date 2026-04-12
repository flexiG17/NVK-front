import { View, TextInput, Pressable } from "react-native";
import { makeStyles } from "@/lib/theme";
import { palette } from "@/shared/config/theme";
import { useState } from "react";
import SearchIcon from "@/assets/icons/search.svg";
import { useLocalization } from "@/shared/lib/i18n";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const { t: i18n } = useLocalization();
  const defaultPlaceholder = placeholder || i18n("search.placeholder");
  const styles = useStyles();
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const handleSearchPress = () => {
    onSearch?.(searchText);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={defaultPlaceholder}
            placeholderTextColor={styles.input.color}
            value={searchText}
            onChangeText={handleTextChange}
            underlineColorAndroid="transparent"
            cursorColor={styles.input.color}
          />
        </View>
        <Pressable style={styles.iconButton} onPress={handleSearchPress}>
          <SearchIcon width={23} height={23} color={palette.white} />
        </Pressable>
      </View>
      <View style={styles.underline} />
    </View>
  );
};

const useStyles = makeStyles((t) => ({
  wrapper: {
    width: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    gap: 4,
    height: 28,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    color: t.colors.textOnAccent,
    fontSize: t.fonts.sizes.md,
    fontFamily: t.fonts.family.regular,
  },
  underline: {
    height: 2,
    backgroundColor: t.colors.textOnAccent,
    marginTop: 8,
  },
  iconButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
}));
