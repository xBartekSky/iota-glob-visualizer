import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ValidatorRow } from "./ValidatorRow";

const ROW_HEIGHT = 57;
const TABLE_WIDTH = 620;

interface ValidatorsTableProps {
  validators: any[];
}

export const ValidatorsTable = ({ validators }: ValidatorsTableProps) => {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const handleSort = (key: "id" | "stake") => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const validatorsWithRank = useMemo(() => {
    if (!validators) return [];
    return validators.map((v, i) => ({ ...v, rank: i + 1 }));
  }, [validators]);

  const sortedValidators = useMemo(() => {
    return [...validatorsWithRank].sort((a, b) => {
      //Sort id
      if (sortConfig.key === "id") {
        return sortConfig.direction === "asc"
          ? a.rank - b.rank
          : b.rank - a.rank;
      }

      // Sort stake
      if (sortConfig.key === "stake") {
        const stakeA = Number(a?.stakingPoolIotaBalance ?? a?.votingPower ?? 0);
        const stakeB = Number(b?.stakingPoolIotaBalance ?? b?.votingPower ?? 0);

        return sortConfig.direction === "desc"
          ? stakeB - stakeA
          : stakeA - stakeB;
      }

      return 0;
    });
  }, [validatorsWithRank, sortConfig]);

  const renderItem = useCallback(
    ({ item, index }: any) => <ValidatorRow item={item} index={index} />,
    [],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      style={styles.tableHorizontalScroll}
      bounces={false}
    >
      <View style={{ width: TABLE_WIDTH }}>
        <View style={styles.tableHeaderRow}>
          <TouchableOpacity
            onPress={() => handleSort("id")}
            style={{ width: 50 }}
          >
            <Text
              style={[
                styles.tableHeaderText,
                sortConfig.key === "id" && styles.activeHeader,
              ]}
            >
              ID{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "↑"
                  : "↓"
                : "↕"}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.tableHeaderText, { width: 150 }]}>
            Validator
          </Text>

          <TouchableOpacity
            onPress={() => handleSort("stake")}
            style={{ width: 120, alignItems: "flex-end" }}
          >
            <Text
              style={[
                styles.tableHeaderText,
                sortConfig.key === "stake" && styles.activeHeader,
              ]}
            >
              Stake{" "}
              {sortConfig.key === "stake"
                ? sortConfig.direction === "desc"
                  ? "↓"
                  : "↑"
                : "↕"}
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.tableHeaderText, { width: 100, textAlign: "right" }]}
          >
            Success %
          </Text>
          <Text
            style={[
              styles.tableHeaderText,
              { width: 100, textAlign: "center" },
            ]}
          >
            Country
          </Text>
          <Text
            style={[styles.tableHeaderText, { width: 80, textAlign: "center" }]}
          >
            Status
          </Text>
        </View>

        <FlatList
          data={sortedValidators}
          extraData={sortConfig}
          renderItem={renderItem}
          keyExtractor={(item) => item.iotaAddress}
          scrollEnabled={true}
          getItemLayout={getItemLayout}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tableHorizontalScroll: { flex: 1, marginHorizontal: 16 },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
  },
  tableHeaderText: { color: "#888888", fontSize: 12, paddingHorizontal: 8 },
  activeHeader: {
    color: "#00FFCC",
    fontWeight: "bold",
  },
});
