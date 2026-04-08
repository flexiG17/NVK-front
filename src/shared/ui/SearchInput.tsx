import { View, TextInput, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { makeStyles } from "@/lib/theme";
import { useState } from "react";

const searchIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <path d="M21 21L17.1007 17.1007M17.1007 17.1007C18.8075 15.3939 19.8632 13.036 19.8632 10.4316C19.8632 5.22266 15.6405 1 10.4316 1C5.22266 1 1 5.22266 1 10.4316C1 15.6405 5.22266 19.8632 10.4316 19.8632C13.036 19.8632 15.3939 18.8075 17.1007 17.1007Z" stroke="white" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
</svg>`;

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
}

export const SearchInput = ({
  placeholder = "Поиск по ФИО",
  onSearch,
}: SearchInputProps) => {
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
            placeholder={placeholder}
            placeholderTextColor="#FFFFFF"
            value={searchText}
            onChangeText={handleTextChange}
            underlineColorAndroid="transparent"
            cursorColor="rgba(255, 255, 255, 0.5)"
          />
        </View>
        <Pressable style={styles.iconButton} onPress={handleSearchPress}>
          <SvgXml xml={searchIconSvg} width={23} height={23} />
        </Pressable>
      </View>
      <View style={styles.underline} />
    </View>
  );
};

const useStyles = makeStyles((t) => ({
  wrapper: {
    width: "100%",
    maxWidth: 320,
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
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: t.fonts.family.regular,
  },
  underline: {
    height: 2,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
  },
  iconButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
}));
