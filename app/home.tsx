import { makeStyles, useTheme } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

function Pill({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
}) {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.pill,
        variant === "dark" ? styles.pillDark : styles.pillLight,
      ]}
    >
      <Text style={styles.pillText}>{children}</Text>
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.root}>
      {theme.dark && (
        <ExpoImage
          source={require("../src/assets/images/loginscreen.svg")}
          contentFit="cover"
          style={styles.backgroundImage}
        />
      )}
      <View style={styles.bgOverlay} />

      <ScrollView
        style={styles.scroller}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
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
            <Ionicons
              name="search-outline"
              size={18}
              color={theme.colors.iconOnSurface}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск"
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>
          <Pressable style={styles.iconButton}>
            <Ionicons
              name="qr-code-outline"
              size={18}
              color={theme.colors.icon}
            />
          </Pressable>
        </View>

        <View style={styles.challengeRow}>
          <View style={styles.challengeInner}>
            <Ionicons
              name="bulb-outline"
              size={18}
              color={theme.colors.iconOnSurface}
            />
            <Text style={styles.challengeText}>Новые челленджи</Text>
          </View>
          <View style={styles.challengeIcons}>
            <Pressable style={styles.squareIcon}>
              <Ionicons
                name="book-outline"
                size={18}
                color={theme.colors.iconOnSurface}
              />
            </Pressable>
            <Pressable style={styles.squareIcon}>
              <Ionicons
                name="trophy-outline"
                size={18}
                color={theme.colors.iconOnSurface}
              />
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
          {[1, 2, 3].map((_, idx) => (
            <View key={idx} style={styles.eventCard}>
              <View style={styles.eventThumb} />
              <Text style={styles.eventTitle}>Название</Text>
              <Text style={styles.eventMeta}>25 февраля</Text>
              <Text style={styles.eventMeta}>14:00 - 15:00</Text>
              <Text style={styles.eventMeta}>Место/Скоро</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Активности</Text>
          <Text style={styles.allLink}>все ›</Text>
        </View>

        <View style={styles.activityCard}>
          <Text style={styles.activityName}>Прочитать 5 статей за неделю</Text>
          <View style={styles.activityRatioRow}>
            <View style={styles.activityRatioBox}>
              <Text style={styles.activityRatioBig}>3/5</Text>
            </View>
            <View>
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
            style={({ pressed }) => [
              styles.recoButton,
              pressed && styles.recoButtonPressed,
            ]}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.recoButtonText}>Забронировать</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {(
          [
            { icon: "home-outline", route: "/home" },
            { icon: "bag-outline", route: null },
            { icon: "notifications-outline", route: null },
            { icon: "person-outline", route: null },
          ] as const
        ).map((tab, i) => (
          <Pressable
            key={i}
            style={styles.tabItem}
            onPress={() => tab.route && router.push(tab.route)}
          >
            <Ionicons name={tab.icon} size={22} color={theme.colors.tabIcon} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const useStyles = makeStyles((t) => ({
  root: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  scroller: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: t.colors.overlay,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 58,
    paddingBottom: 110,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: t.borderRadius.full,
  },
  pillLight: {
    backgroundColor: t.colors.pillBackground,
  },
  pillDark: {
    backgroundColor: t.colors.surfaceTransparent,
    borderWidth: 1,
    borderColor: t.colors.pillBorder,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "700",
    color: t.colors.textPrimary,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  greeting: {
    marginTop: 18,
    color: t.colors.textPrimary,
    fontSize: t.fonts.sizes.greeting,
    fontWeight: "800",
  },
  levelBlock: {
    marginTop: 12,
  },
  levelTitle: {
    color: t.colors.textPrimary,
    fontSize: t.fonts.sizes.md,
    fontWeight: "700",
  },
  levelSub: {
    color: t.colors.textSecondary,
    fontSize: t.fonts.sizes.sm,
    marginTop: 6,
  },
  searchRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInner: {
    flex: 1,
    backgroundColor: t.colors.inputBackground,
    borderRadius: t.borderRadius.md,
    height: 46,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    color: t.colors.inputText,
    fontWeight: "600",
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: t.borderRadius.md,
    backgroundColor: t.colors.surfaceTransparent,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeRow: {
    marginTop: 12,
    backgroundColor: t.colors.card,
    borderRadius: t.borderRadius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  challengeInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  challengeText: {
    color: t.colors.textOnSurface,
    fontWeight: "700",
    fontSize: t.fonts.sizes.sm,
  },
  challengeIcons: {
    flexDirection: "row",
    gap: 10,
  },
  squareIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: t.colors.surfaceTransparent,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  sectionTitle: {
    color: t.colors.textPrimary,
    fontSize: t.fonts.sizes.md,
    fontWeight: "800",
  },
  allLink: {
    color: t.colors.link,
    fontWeight: "700",
    fontSize: t.fonts.sizes.sm,
  },
  horizontalCards: {
    paddingVertical: 14,
    gap: 14,
  },
  eventCard: {
    width: 160,
    backgroundColor: t.colors.eventCardBg,
    borderRadius: t.borderRadius.xl,
    padding: 12,
    overflow: "hidden",
    elevation: 4,
  },
  eventThumb: {
    height: 86,
    backgroundColor: t.colors.thumbPlaceholder,
    borderRadius: t.borderRadius.lg,
    marginBottom: 10,
  },
  eventTitle: {
    color: t.dark ? "#fff" : t.colors.textOnSurface,
    fontWeight: "800",
    fontSize: t.fonts.sizes.sm,
    marginBottom: 6,
  },
  eventMeta: {
    color: t.dark ? "rgba(255,255,255,0.85)" : t.colors.textSecondary,
    fontSize: t.fonts.sizes.xs,
    marginTop: 2,
  },
  activityCard: {
    marginTop: 14,
    backgroundColor: t.colors.card,
    borderRadius: t.borderRadius.xl,
    padding: 16,
    overflow: "hidden",
  },
  activityName: {
    color: t.colors.textOnSurface,
    fontWeight: "800",
    fontSize: t.fonts.sizes.sm,
  },
  activityRatioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 16,
  },
  activityRatioBox: {
    width: 86,
    height: 72,
    borderRadius: t.borderRadius.lg,
    backgroundColor: t.colors.accentSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  activityRatioBig: {
    color: t.colors.textOnAccent,
    fontWeight: "900",
    fontSize: 22,
  },
  activityPointsText: {
    color: t.colors.accent,
    fontWeight: "800",
    fontSize: t.fonts.sizes.sm,
  },
  activityPointsSub: {
    color: t.colors.textSecondary,
    marginTop: 6,
    fontSize: t.fonts.sizes.xs,
    fontWeight: "700",
  },
  recoCard: {
    marginTop: 14,
    backgroundColor: t.colors.card,
    borderRadius: t.borderRadius.xl,
    padding: 14,
  },
  recoThumb: {
    height: 120,
    borderRadius: t.borderRadius.lg,
    backgroundColor: t.colors.thumbPlaceholder,
    marginBottom: 12,
  },
  recoTitle: {
    color: t.colors.textOnSurface,
    fontWeight: "800",
    fontSize: t.fonts.sizes.sm,
  },
  recoTime: {
    color: t.colors.textSecondary,
    marginTop: 8,
    fontWeight: "700",
    fontSize: t.fonts.sizes.xs,
  },
  recoButton: {
    marginTop: 14,
    backgroundColor: t.colors.accent,
    borderRadius: t.borderRadius.md,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  recoButtonPressed: {
    backgroundColor: t.colors.accentPressed,
  },
  recoButtonText: {
    color: t.colors.textOnAccent,
    fontWeight: "800",
  },
  bottomBar: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 16,
    height: 58,
    backgroundColor: t.colors.bottomBar,
    borderRadius: t.borderRadius.xl,
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
    borderRadius: t.borderRadius.lg,
  },
}));
