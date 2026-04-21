import { useMemo, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import FloorIcon from "@/assets/icons/map-navigation/floor.svg";
import GeoPickIcon from "@/assets/icons/map-navigation/geolocation.svg";
import LocationFillIcon from "@/assets/icons/map-navigation/f7_location-fill.svg";
import SortIcon from "@/assets/icons/map-navigation/proicons_arrow-sort.svg";
import SearchIcon from "@/assets/icons/map-navigation/search_icon.svg";
import CrossIcon from "@/assets/icons/map-navigation/cross.svg";

type ScaleState = {
  max: number;
  min: number;
  current: number;
};

type MapNavigationControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onLocate?: () => void;
  onScaleChange?: (nextScale: number) => void;
  scale: ScaleState;
  floorList: number[];
  currentFloor: number;
  onFloorChange: (floor: number) => void;
};

type RoundActionButtonProps = {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function RoundActionButton({
  onPress,
  disabled = false,
  children,
}: RoundActionButtonProps) {
  const scale = useMemo(() => new Animated.Value(1), []);

  const animatePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 30,
      bounciness: 0,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.roundButtonWrap, { transform: [{ scale }] }]}
      pointerEvents="box-none"
    >
      <Pressable
        style={({ pressed }) => [
          styles.roundButton,
          pressed && styles.roundButtonPressed,
          disabled && styles.roundButtonDisabled,
        ]}
        disabled={disabled}
        onPress={onPress}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default function MapNavigationControls({
  onZoomIn,
  onZoomOut,
  onLocate,
  onScaleChange,
  scale,
  floorList,
  currentFloor,
  onFloorChange,
}: MapNavigationControlsProps) {
  const [searchValue, setSearchValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");

  const isMaxScale = scale.current >= scale.max;
  const isMinScale = scale.current <= scale.min;

  const handleZoomIn = () => {
    if (isMaxScale) return;
    const nextScale = Math.min(scale.current * 1.2, scale.max);
    onZoomIn();
    onScaleChange?.(nextScale);
  };

  const handleZoomOut = () => {
    if (isMinScale) return;
    const nextScale = Math.max(scale.current * 0.8, scale.min);
    onZoomOut();
    onScaleChange?.(nextScale);
  };

  const clearSearch = () => setSearchValue("");

  const commitSearchToHistory = () => {
    const value = searchValue.trim();
    if (!value) return;

    setHistory((prev) => [value, ...prev.filter((item) => item !== value)].slice(0, 4));
  };

  const swapRoutePoints = () => {
    setPointA(pointB);
    setPointB(pointA);
  };

  const clearRoutePoints = () => {
    setPointA("");
    setPointB("");
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.rightControls}>
        <RoundActionButton onPress={handleZoomIn} disabled={isMaxScale}>
          <Text style={[styles.zoomSign, isMaxScale && styles.zoomSignDisabled]}>+</Text>
        </RoundActionButton>
        <RoundActionButton onPress={handleZoomOut} disabled={isMinScale}>
          <Text style={[styles.zoomSign, isMinScale && styles.zoomSignDisabled]}>-</Text>
        </RoundActionButton>
        <RoundActionButton onPress={onLocate}>
          <LocationFillIcon width={20} height={20} />
        </RoundActionButton>
      </View>

      <View style={styles.floorBlock}>
        <View style={styles.floorHeader}>
          <FloorIcon width={24} height={24} />
        </View>
        <View style={styles.floorGrid}>
          {floorList.map((floor) => {
            const isActive = floor === currentFloor;

            return (
              <Pressable
                key={floor}
                onPress={() => onFloorChange(floor)}
                style={[styles.floorCell, isActive && styles.floorCellActive]}
              >
                <Text style={[styles.floorCellText, isActive && styles.floorCellTextActive]}>
                  {floor}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.searchBlock}>
        <View style={[styles.searchInputWrap, searchValue.length > 0 && styles.searchInputWrapCompact]}>
          <SearchIcon width={16} height={16} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск мест"
            value={searchValue}
            onChangeText={setSearchValue}
            onSubmitEditing={commitSearchToHistory}
            placeholderTextColor="#949AA8"
          />
          {searchValue.length > 0 && (
            <Pressable onPress={clearSearch} hitSlop={8}>
              <CrossIcon width={14} height={14} />
            </Pressable>
          )}
        </View>

        <View style={styles.routeBlock}>
          <RoutePointInput marker="A" placeholder="Точка А" value={pointA} onChangeText={setPointA} />
          <RoutePointInput marker="B" placeholder="Точка В" value={pointB} onChangeText={setPointB} />
        </View>

        <View style={styles.routeActions}>
          <Pressable onPress={swapRoutePoints} style={styles.routeIconButton}>
            <SortIcon width={16} height={16} />
          </Pressable>
          <Pressable onPress={clearRoutePoints} style={styles.routeIconButton}>
            <CrossIcon width={14} height={14} />
          </Pressable>
          <Pressable style={styles.pickOnMapButton}>
            <GeoPickIcon width={16} height={16} />
            <Text style={styles.pickOnMapText}>Выбрать на карте</Text>
          </Pressable>
        </View>

        <View style={styles.historyBlock}>
          {history.map((item) => (
            <Pressable key={item} style={styles.historyItem} onPress={() => setSearchValue(item)}>
              <Text style={styles.historyText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

type RoutePointInputProps = {
  marker: "A" | "B";
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
};

function RoutePointInput({
  marker,
  placeholder,
  value,
  onChangeText,
}: RoutePointInputProps) {
  return (
    <View style={styles.routeInputWrap}>
      <View style={styles.routeMarker}>
        <Text style={styles.routeMarkerText}>{marker}</Text>
      </View>
      <TextInput
        style={styles.routeInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#949AA8"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 20,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  rightControls: {
    position: "absolute",
    top: 24,
    right: 16,
    gap: 10,
  },
  roundButtonWrap: {
    shadowColor: "#13161A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 7,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  roundButtonPressed: {
    opacity: 0.92,
  },
  roundButtonDisabled: {
    backgroundColor: "#F2F3F7",
  },
  zoomSign: {
    fontSize: 28,
    lineHeight: 30,
    color: "#111827",
    fontWeight: "500",
  },
  zoomSignDisabled: {
    color: "#B5BCC8",
  },
  floorBlock: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -80 }],
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    gap: 10,
    minWidth: 120,
    shadowColor: "#13161A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  floorHeader: {
    alignItems: "center",
  },
  floorGrid: {
    flexDirection: "column",
    gap: 8,
    alignItems: "stretch",
    width: "100%",
  },
  floorCell: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
    paddingHorizontal: 0,
    borderWidth: 0,
  },
  floorCellActive: {
    backgroundColor: "#1E4391",
    borderRadius: 0,
  },
  floorCellText: {
    color: "#1E2430",
    fontSize: 13,
    fontWeight: "600",
  },
  floorCellTextActive: {
    color: "#FFFFFF",
  },
  searchBlock: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 22,
    gap: 10,
  },
  searchInputWrap: {
    height: 46,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#13161A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  searchInputWrapCompact: {
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#1E2430",
    fontSize: 14,
  },
  routeBlock: {
    gap: 8,
  },
  routeInputWrap: {
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeMarker: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E8EBF2",
    alignItems: "center",
    justifyContent: "center",
  },
  routeMarkerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E2430",
  },
  routeInput: {
    flex: 1,
    fontSize: 14,
    color: "#1E2430",
  },
  routeActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  pickOnMapButton: {
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  pickOnMapText: {
    fontSize: 13,
    color: "#1E2430",
    fontWeight: "600",
  },
  historyBlock: {
    gap: 6,
  },
  historyItem: {
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  historyText: {
    color: "#1E2430",
    fontSize: 13,
  },
});
