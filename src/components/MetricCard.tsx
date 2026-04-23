import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { MiniChart } from "./MiniChart";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CARD_WIDTH = (SCREEN_WIDTH - 32 - 12) / 2;

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  time?: string;
  chartData?: number[];
  color?: string;
  isAccent?: boolean;
}

export const MetricCard = ({
  title,
  value,
  unit,
  time,
  chartData,
  color = "#7B61FF",
  isAccent = false,
}: MetricCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.cardTime}>{time}</Text>
    </View>
    <View style={styles.cardBody}>
      {chartData && chartData.length > 0 ? (
        <MiniChart data={chartData} color={color} />
      ) : (
        <View style={{ height: 24 }} />
      )}
      <View style={styles.valueContainer}>
        <Text
          style={[styles.cardValue, isAccent && { color: "#00FFCC" }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {value}
        </Text>
        {unit && <Text style={styles.cardUnit}> {unit}</Text>}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#161618",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#8A8A93",
    fontSize: SCREEN_WIDTH < 380 ? 11 : 13,
    fontWeight: "500",
    flex: 1,
    marginRight: 4,
  },
  cardTime: {
    color: "#555",
    fontSize: 10,
    fontWeight: "600",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    minHeight: 34,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    flexShrink: 1,
  },
  cardValue: {
    color: "#FFF",
    fontSize: SCREEN_WIDTH < 380 ? 18 : 22,
    fontWeight: "bold",
  },
  cardUnit: {
    color: "#8A8A93",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 2,
  },
});
