import React from "react";
import { View, StyleSheet } from "react-native";

interface MiniChartProps {
  data: number[];
  color: string;
}

export const MiniChart = ({ data, color }: MiniChartProps) => {
  const maxVal = Math.max(...(data.length ? data : [1]));

  return (
    <View style={styles.chartContainer}>
      {data.map((val, index) => (
        <View
          key={index}
          style={[
            styles.chartBar,
            {
              height: Math.max(2, (val / maxVal) * 24),
              backgroundColor: color,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 24,
    gap: 3,
  },
  chartBar: {
    width: 2,
    borderRadius: 2,
  },
});
