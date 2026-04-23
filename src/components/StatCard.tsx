import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StatCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  change: string;
  isPositive: boolean | null;
}

export const StatCard = ({
  title,
  value,
  suffix,
  change,
  isPositive,
}: StatCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              isPositive === null ? "#333" : isPositive ? "#1E3A2F" : "#3A1E1E",
          },
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            {
              color:
                isPositive === null
                  ? "#AAA"
                  : isPositive
                    ? "#00FFCC"
                    : "#FF4C4C",
            },
          ]}
        >
          {isPositive !== null && (isPositive ? "↘ " : "↘ ")}
          {change}
        </Text>
      </View>
    </View>
    <Text style={styles.cardValue}>
      {value}
      <Text style={styles.cardSuffix}>{suffix}</Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    width: 220,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { color: "#888888", fontSize: 14 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 12, fontWeight: "bold" },
  cardValue: { color: "#FFFFFF", fontSize: 24, fontWeight: "bold" },
  cardSuffix: { color: "#666666", fontSize: 16, fontWeight: "normal" },
});
