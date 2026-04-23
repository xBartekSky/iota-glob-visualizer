import React, { Suspense, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Globe } from "../components/Globe";
import { ValidatorInfoSheet } from "../components/ValidatorInfoSheet";
import { Colors } from "../theme/Colors";
import { MetricCard } from "../components/MetricCard";
import { RecentBlocks } from "../components/RecentBlocks";

import { useNetworkDashboard } from "../hooks/useNetworkDashboard";

interface Props {
  onGlobeReady?: () => void;
}

const GlobeScreen: React.FC<Props> = ({ onGlobeReady }) => {
  const [selectedValidators, setSelectedValidators] = useState<any[]>([]);

  const {
    validators,
    isLoading,
    currentEpoch,
    processedBlocks,
    latestBlock,
    stats,
    getInitial,
  } = useNetworkDashboard();

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.mapSection}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={5.0} color="white" />
            {validators && (
              <Globe
                validators={validators}
                onValidatorPress={setSelectedValidators}
              />
            )}
            <OrbitControls
              makeDefault
              enablePan={false}
              enableZoom={true}
              minDistance={4}
              maxDistance={12}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>

        <SafeAreaView style={styles.safeUIOverlay} pointerEvents="box-none">
          <View style={styles.headerPills}>
            <View style={styles.pill}>
              <Text style={styles.pillLabel}>
                #{currentEpoch || "--"}{" "}
                <Text style={styles.pillSubLabel}>epoch</Text>
              </Text>
              <View style={styles.pillDivider} />

              {stats?.leaderLogo ? (
                <Image
                  source={{ uri: stats.leaderLogo }}
                  style={styles.pillLogo}
                />
              ) : (
                <View style={styles.pillMockLogo}>
                  <Text style={styles.pillMockInitial}>
                    {getInitial(stats?.leaderName || "")}
                  </Text>
                </View>
              )}

              <Text style={styles.leaderName} numberOfLines={1}>
                {stats?.leaderName || "Loading..."}
              </Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillSubLabel}>
                Validators{" "}
                <Text style={styles.pillLabel}>{stats?.activeCount || 0}</Text>
              </Text>
            </View>
          </View>
        </SafeAreaView>

        {isLoading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#00FFCC"
          />
        )}
      </View>

      <View style={styles.dashboardContainer}>
        <ScrollView
          style={styles.dashboardScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <RecentBlocks blocks={processedBlocks || []} />

            <View style={styles.metricsGrid}>
              <MetricCard
                title="Latest Checkpoint"
                value={
                  latestBlock
                    ? parseInt(latestBlock.blockNumber, 10).toLocaleString()
                    : "..."
                }
                unit=""
                time="live"
                color="#00FFCC"
                isAccent={true}
              />
              <MetricCard
                title="Recent Block Val"
                value={latestBlock ? latestBlock.validatorName : "..."}
                unit=""
                time="live"
                color="#7B61FF"
              />
              <MetricCard
                title="Total Stake"
                value={stats?.totalStake?.toFixed(2) || "0"}
                unit=""
                time="current"
                color="#00FFCC"
              />
              <MetricCard
                title="Avg Commission"
                value={stats?.avgComm || "0"}
                unit="%"
                time="active"
                color="#7B61FF"
              />
              <MetricCard
                title="Validators in Set"
                value={stats?.activeCount || "0"}
                time="total"
              />
              <MetricCard
                title="Current Epoch"
                value={currentEpoch || "--"}
                time="live"
              />
            </View>
            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </View>

      <ValidatorInfoSheet
        validators={selectedValidators}
        onClose={() => setSelectedValidators([])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: StatusBar.currentHeight ?? 0,
  },
  mapSection: {
    height: "52%",
    width: "100%",
    backgroundColor: Colors.background,
  },
  safeUIOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerPills: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  dashboardContainer: { flex: 1, backgroundColor: Colors.background },
  dashboardScroll: { flex: 1 },
  scrollContent: { padding: 16 },
  loader: { position: "absolute", top: "50%", alignSelf: "center" },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20, 20, 25, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  pillLabel: { color: "#FFF", fontWeight: "bold", fontSize: 12 },
  pillSubLabel: { color: "#888", fontSize: 10 },
  pillDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 8,
  },
  leaderName: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    maxWidth: 100,
  },

  pillLogo: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 6,
  },
  pillMockLogo: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#7B61FF",
    marginRight: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  pillMockInitial: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  fullWidthCard: {
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#161618",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { color: "#8A8A93", fontSize: 13, fontWeight: "500" },
  cardTime: { color: "#555", fontSize: 11, fontWeight: "600" },
  historyBars: { flexDirection: "row", gap: 2, marginVertical: 12, height: 20 },
  historyBarGreen: { flex: 1, backgroundColor: "#00FFCC", borderRadius: 1 },
});

export default GlobeScreen;
