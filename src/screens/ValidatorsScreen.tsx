import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme/Colors";
import { useNetworkDashboard } from "../hooks/useNetworkDashboard";
import { GlobalMetrics } from "../components/GlobalMetrics";
import { ValidatorsTable } from "../components/ValidatorsTable";

const ValidatorsScreen = () => {
  const { validators, isLoading, currentEpoch, stats } = useNetworkDashboard();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#00FFCC" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GlobalMetrics stats={stats} currentEpoch={currentEpoch} />

      <ValidatorsTable validators={validators} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centerContent: { justifyContent: "center", alignItems: "center" },
});

export default ValidatorsScreen;
