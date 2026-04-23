import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface ValidatorRowProps {
  item: any;
  index: number;
}

export const ValidatorRow = React.memo(({ item, index }: ValidatorRowProps) => {
  const formattedVotingPower = Number(item.votingPower || 0).toLocaleString(
    "en-US",
  );

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { width: 50 }]}> {item.rank}</Text>
      <View
        style={[
          styles.tableCell,
          { width: 150, flexDirection: "row", alignItems: "center" },
        ]}
      >
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.logo} />
        ) : (
          <View style={styles.mockLogo} />
        )}
        <Text style={styles.tableCellText} numberOfLines={1}>
          {item.name || "Unknown Validator"}
        </Text>
      </View>
      <Text
        style={[
          styles.tableCell,
          styles.tableCellText,
          { width: 120, textAlign: "right" },
        ]}
      >
        {formattedVotingPower}
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.tableCellText,
          { width: 100, textAlign: "right" },
        ]}
      >
        100.0%
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.tableCellText,
          { width: 100, textAlign: "center" },
        ]}
      >
        {item.country || "--"}
      </Text>
      <View
        style={[
          styles.tableCell,
          { width: 80, alignItems: "center", justifyContent: "center" },
        ]}
      >
        <View style={styles.statusDot} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableCell: {
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#FFFFFF",
  },
  tableCellText: { color: "#FFFFFF", fontSize: 14, fontWeight: "500" },
  logo: { width: 20, height: 20, borderRadius: 10, marginRight: 8 },
  mockLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#7B61FF",
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FFCC",
  },
});
