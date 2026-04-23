import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LiveBadgeProps {
  text?: string;
}

export const LiveBadge = ({ text = "Live" }: LiveBadgeProps) => (
  <View style={styles.liveBadge}>
    <View style={styles.liveDot} />
    <Text style={styles.liveText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 204, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00FFCC",
    marginRight: 4,
  },
  liveText: {
    color: "#00FFCC",
    fontSize: 10,
    fontWeight: "bold",
  },
});
