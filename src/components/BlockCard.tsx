import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface BlockProps {
  blockNumber: string;
  validatorName: string;
  validatorLogo?: string;
  round: string;
  transactions: number;
}

export const BlockCard = ({
  blockNumber,
  validatorName,
  round,
  transactions,
}: BlockProps) => {
  return (
    <View style={styles.blockCard}>
      <View style={styles.leftColumn}>
        <Text style={styles.label}>BLOCK</Text>
        <Text style={styles.primaryValue}>{blockNumber}</Text>
        <Text style={styles.label}>VALIDATOR</Text>
        <Text style={styles.secondaryValue} numberOfLines={1}>
          {validatorName}
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={[styles.label, styles.textRight]}>ROUND</Text>
        <Text style={[styles.primaryValue, styles.textRight]}>{round}</Text>
        <Text style={[styles.label, styles.textRight]}>TRANSACTIONS</Text>
        <Text style={[styles.secondaryValue, styles.textRight]}>
          {transactions}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blockCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    padding: 12,
  },
  leftColumn: {
    flex: 1,
    marginRight: 16,
  },
  rightColumn: {
    justifyContent: "center",
  },
  label: {
    color: "#666666",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 2,
    marginTop: 4,
  },
  primaryValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryValue: {
    color: "#E0E0E0",
    fontSize: 13,
    fontWeight: "600",
  },
  textRight: {
    textAlign: "right",
  },
});
