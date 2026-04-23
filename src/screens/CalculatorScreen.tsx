import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  SafeAreaView,
} from "react-native";

import { Colors } from "../theme/Colors";
import { MetricCard } from "../components/MetricCard";

const CalculatorScreen: React.FC = () => {
  const [iotaAmount, setIotaAmount] = useState<string>("1000");
  const [apy, setApy] = useState<string>("5.0");

  const results = useMemo(() => {
    const amount = parseFloat(iotaAmount) || 0;
    const rate = parseFloat(apy) || 0;

    const yearlyReward = amount * (rate / 100);
    const monthlyReward = yearlyReward / 12;
    const dailyReward = yearlyReward / 365;
    const totalAfterYear = amount + yearlyReward;

    return {
      daily: dailyReward.toFixed(2),
      monthly: monthlyReward.toFixed(2),
      yearly: yearlyReward.toFixed(2),
      total: totalAfterYear.toFixed(2),
    };
  }, [iotaAmount, apy]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerPills}>
          <View style={styles.pill}>
            <Text style={styles.pillLabel}>
              Staking <Text style={styles.pillSubLabel}>Calculator</Text>
            </Text>
            <View style={styles.pillDivider} />
            <Text style={styles.leaderName}>IOTA</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.dashboardContainer}>
        <ScrollView
          style={styles.dashboardScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Staking Parameters</Text>

              <View style={styles.inputCard}>
                <View style={styles.inputHeader}>
                  <Text style={styles.inputLabel}>Stake Amount</Text>
                  <Text style={styles.inputUnit}>IOTA</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={iotaAmount}
                  onChangeText={setIotaAmount}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#555"
                />
              </View>

              <View style={styles.inputCard}>
                <View style={styles.inputHeader}>
                  <Text style={styles.inputLabel}>Estimated APY</Text>
                  <Text style={styles.inputUnit}>%</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={apy}
                  onChangeText={setApy}
                  keyboardType="numeric"
                  placeholder="0.0"
                  placeholderTextColor="#555"
                />
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Estimated Returns</Text>

              <View style={styles.metricsGrid}>
                <MetricCard
                  title="Daily Reward"
                  value={`+${results.daily}`}
                  unit="IOTA"
                  time="24h"
                  color="#00FFCC"
                  isAccent={true}
                />
                <MetricCard
                  title="Monthly Reward"
                  value={`+${results.monthly}`}
                  unit="IOTA"
                  time="30d"
                  color="#7B61FF"
                />
                <MetricCard
                  title="Yearly Reward"
                  value={`+${results.yearly}`}
                  unit="IOTA"
                  time="365d"
                  color="#00FFCC"
                />
                <MetricCard
                  title="Total After 1 Year"
                  value={results.total}
                  unit="IOTA"
                  time="projected"
                />
              </View>
            </View>

            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background || "#121212",
  },
  headerSafeArea: {
    backgroundColor: Colors.background || "#121212",
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 10,
    zIndex: 10,
  },
  headerPills: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 25, 0.9)",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  pillLabel: { color: "#FFF", fontWeight: "bold", fontSize: 13 },
  pillSubLabel: { color: "#888", fontSize: 11 },
  pillDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 10,
  },
  leaderName: { color: "#00FFCC", fontSize: 13, fontWeight: "bold" },

  dashboardContainer: {
    flex: 1,
    backgroundColor: Colors.background || "#121212",
  },
  dashboardScroll: { flex: 1 },
  scrollContent: { padding: 16 },

  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#A0A0A0",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    marginLeft: 4,
  },

  inputCard: {
    backgroundColor: "#161618",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 12,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  inputLabel: {
    color: "#8A8A93",
    fontSize: 13,
    fontWeight: "500",
  },
  inputUnit: {
    color: "#555",
    fontSize: 11,
    fontWeight: "600",
  },
  textInput: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    paddingBottom: 8,
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
});

export default CalculatorScreen;
