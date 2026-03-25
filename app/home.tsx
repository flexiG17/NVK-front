import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

function Pill({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <View
      style={[
        styles.pill,
        variant === "dark" ? styles.pillDark : styles.pillLight,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          variant === "dark" ? styles.pillTextLight : styles.pillTextDark,
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ExpoImage
        source={require("../src/assets/images/loginscreen.svg")}
        contentFit="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.bgOverlay} />

      <ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Pill variant="light">НВК Life</Pill>
            <View style={{ marginLeft: 10 }}>
              <Pill variant="dark">Студент</Pill>
            </View>
          </View>

          <Text style={styles.greeting}>Привет, Имя!</Text>
          <View style={styles.levelBlock}>
            <Text style={styles.levelTitle}>Уровень 5</Text>
            <Text style={styles.levelSub}>1250/5000 баллов</Text>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInner}>
            <Ionicons name="search-outline" size={18} color="rgba(0,0,0,0.65)" />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск"
              placeholderTextColor="rgba(0,0,0,0.55)"
            />
          </View>
          <Pressable style={styles.iconButton} onPress={() => {}}>
            <Ionicons name="qr-code-outline" size={18} color="#0B2B6D" />
          </Pressable>
        </View>

        <View style={styles.challengeRow}>
          <View style={styles.challengeInner}>
            <Ionicons name="bulb-outline" size={18} color="#0B2B6D" />
            <Text style={styles.challengeText}>Новые челленджи</Text>
          </View>
          <View style={styles.challengeIcons}>
            <Pressable style={styles.squareIcon} onPress={() => {}}>
              <Ionicons name="book-outline" size={18} color="#0B2B6D" />
            </Pressable>
            <Pressable style={styles.squareIcon} onPress={() => {}}>
              <Ionicons name="trophy-outline" size={18} color="#0B2B6D" />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Сегодня</Text>
          <Text style={styles.allLink}>все ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalCards}
        >
          {[
            { title: "Название", meta: "Место/Скоро" },
            { title: "Название", meta: "Место/Скоро" },
            { title: "Название", meta: "Место/Скоро" },
          ].map((item, idx) => (
            <View key={idx} style={styles.eventCard}>
              <View style={styles.eventThumb} />
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventMeta}>25 февраля</Text>
              <Text style={styles.eventMeta}>14:00 - 15:00</Text>
              <Text style={styles.eventMeta}>{item.meta}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Активности</Text>
          <Text style={styles.allLink}>все ›</Text>
        </View>

        <View style={styles.activityCard}>
          <View style={styles.activityTop}>
            <Text style={styles.activityName}>Прочитать 5 статей за неделю</Text>
          </View>
          <View style={styles.activityRatioRow}>
            <View style={styles.activityRatioBox}>
              <Text style={styles.activityRatioBig}>3/5</Text>
            </View>
            <View style={styles.activityPoints}>
              <Text style={styles.activityPointsText}>100 баллов</Text>
              <Text style={styles.activityPointsSub}>Осталось: 5 дней</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Рекомендуем</Text>
        </View>

        <View style={styles.recoCard}>
          <View style={styles.recoThumb} />
          <Text style={styles.recoTitle}>Спортивная площадка рядом</Text>
          <Text style={styles.recoTime}>18:00 - 20:00</Text>
          <Pressable
            style={styles.recoButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.recoButtonText}>Забронировать</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.tabItem}
          onPress={() => router.push("/home")}
        >
          <Ionicons name="home-outline" size={22} color="#3B3B88" />
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="bag-outline" size={22} color="#3B3B88" />
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="notifications-outline" size={22} color="#3B3B88" />
        </Pressable>
        <Pressable style={styles.tabItem} onPress={() => {}}>
          <Ionicons name="person-outline" size={22} color="#3B3B88" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0B2B6D" },
  scroller: { flex: 1 },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(20, 40, 120, 0.35)",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 58,
    paddingBottom: 110,
  },
  header: {},
  brandRow: { flexDirection: "row", alignItems: "center" },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillLight: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  pillDark: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },
  pillText: { fontSize: 13, fontWeight: "700" },
  pillTextDark: { color: "#FFFFFF" },
  pillTextLight: { color: "#FFFFFF" },
  greeting: {
    marginTop: 18,
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },
  levelBlock: { marginTop: 12 },
  levelTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  levelSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 6 },

  searchRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInner: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 46,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, padding: 0, color: "#0B2B6D", fontWeight: "600" },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  challengeRow: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  challengeInner: { flexDirection: "row", alignItems: "center", gap: 10 },
  challengeText: { color: "#0B2B6D", fontWeight: "700", fontSize: 14 },
  challengeIcons: { flexDirection: "row", gap: 10 },
  squareIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "rgba(14, 44, 120, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginTop: 22 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
  allLink: { color: "rgba(255,255,255,0.9)", fontWeight: "700", fontSize: 14 },

  horizontalCards: { paddingVertical: 14, gap: 14 },
  eventCard: {
    width: 160,
    backgroundColor: "rgba(10, 18, 50, 0.85)",
    borderRadius: 18,
    padding: 12,
    overflow: "hidden",
    elevation: 4,
  },
  eventThumb: {
    height: 86,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 14,
    marginBottom: 10,
  },
  eventTitle: { color: "#fff", fontWeight: "800", fontSize: 14, marginBottom: 6 },
  eventMeta: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 2 },

  activityCard: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    overflow: "hidden",
  },
  activityTop: {},
  activityName: { color: "#0B2B6D", fontWeight: "800", fontSize: 14 },
  activityRatioRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 16 },
  activityRatioBox: {
    width: 86,
    height: 72,
    borderRadius: 14,
    backgroundColor: "#2F4CA2",
    alignItems: "center",
    justifyContent: "center",
  },
  activityRatioBig: { color: "#fff", fontWeight: "900", fontSize: 22 },
  activityPoints: {},
  activityPointsText: { color: "#3B3B88", fontWeight: "800", fontSize: 14 },
  activityPointsSub: { color: "rgba(0,0,0,0.55)", marginTop: 6, fontSize: 12, fontWeight: "700" },

  recoCard: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
  },
  recoThumb: {
    height: 120,
    borderRadius: 14,
    backgroundColor: "rgba(10, 18, 50, 0.15)",
    marginBottom: 12,
  },
  recoTitle: { color: "#0B2B6D", fontWeight: "800", fontSize: 14 },
  recoTime: { color: "rgba(0,0,0,0.6)", marginTop: 8, fontWeight: "700", fontSize: 12 },
  recoButton: {
    marginTop: 14,
    backgroundColor: "#3B3B88",
    borderRadius: 12,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  recoButtonText: { color: "#fff", fontWeight: "800" },

  bottomBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 16,
    height: 58,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 6,
  },
  tabItem: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
});

