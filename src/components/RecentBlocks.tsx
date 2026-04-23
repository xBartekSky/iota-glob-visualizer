import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LiveBadge } from "./LiveBadge";
import { BlockCard, BlockProps } from "./BlockCard";

export const RecentBlocks = ({ blocks = [] }: { blocks?: BlockProps[] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Blocks</Text>
        <LiveBadge text="Live" />
      </View>

      <View style={styles.listContainer}>
        {blocks.length > 0 ? (
          blocks.map((block, index) => (
            <BlockCard key={block.blockNumber || index} {...block} />
          ))
        ) : (
          <Text style={styles.loadingText}>Waiting for blocks...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    color: "#A0A0A0",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    gap: 12,
  },
  loadingText: {
    color: "#666666",
    textAlign: "center",
    padding: 20,
  },
});
