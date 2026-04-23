import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatCard } from "./StatCard";

interface GlobalMetricsProps {
  stats: any;
  currentEpoch: string | undefined;
}

export const GlobalMetrics = ({ stats, currentEpoch }: GlobalMetricsProps) => {
  const dynamicStats = [
    {
      id: "1",
      title: "Total Voting Power",
      value: stats?.totalVP?.toLocaleString("en-US") || "0",
      change: "Live",
      isPositive: true,
    },
    {
      id: "2",
      title: "Current Epoch",
      value: currentEpoch || "--",
      change: "Active",
      isPositive: true,
    },
    {
      id: "3",
      title: "Avg Commission",
      value: stats?.avgComm || "0.00",
      suffix: "%",
      change: "Live",
      isPositive: true,
    },
    {
      id: "4",
      title: "Active Validators",
      value: stats?.activeCount?.toString() || "0",
      change: "Active",
      isPositive: null,
    },
  ];

  return (
    <View style={styles.topSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Global Metrics</Text>
        <Text style={styles.sectionSubtitle}>• live stats</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {dynamicStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </ScrollView>

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={styles.sectionTitle}>Validator Performance</Text>
        <Text style={styles.sectionSubtitle}>• Active set</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: { paddingHorizontal: 16, paddingTop: 16 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "600" },
  sectionSubtitle: { color: "#888888", fontSize: 12, marginLeft: 8 },
});
