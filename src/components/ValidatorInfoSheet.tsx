import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";

interface Props {
  validators: any[];
  onClose: () => void;
}

export const ValidatorInfoSheet: React.FC<Props> = ({
  validators,
  onClose,
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [displayedValidators, setDisplayedValidators] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayed = displayedValidators[selectedIndex];
  const isCluster = displayedValidators.length > 1;

  useEffect(() => {
    if (validators && validators.length > 0) {
      if (displayedValidators.length > 0) {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 300,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setDisplayedValidators(validators);
          setSelectedIndex(0);
          slideAnim.setValue(300);
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              damping: 20,
              stiffness: 200,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        });
      } else {
        setDisplayedValidators(validators);
        setSelectedIndex(0);
        slideAnim.setValue(300);
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDisplayedValidators([]);
        setSelectedIndex(0);
      });
    }
  }, [validators]);

  if (!displayed) return null;

  const vp = Number(displayed.votingPower || 0).toLocaleString("en-US");
  const comm = (Number(displayed.commissionRate || 0) / 100).toFixed(2);

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.handle} />

        {isCluster && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.clusterList}
            contentContainerStyle={styles.clusterListContent}
          >
            {displayedValidators.map((v, i) => (
              <TouchableOpacity
                key={v.iotaAddress}
                onPress={() => setSelectedIndex(i)}
                style={[
                  styles.clusterItem,
                  i === selectedIndex && styles.clusterItemActive,
                ]}
              >
                {v.imageUrl ? (
                  <Image
                    source={{ uri: v.imageUrl }}
                    style={styles.clusterLogo}
                  />
                ) : (
                  <View style={styles.clusterMockLogo} />
                )}
                <Text style={styles.clusterName} numberOfLines={1}>
                  {v.name || "Unknown"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.header}>
          {displayed.imageUrl ? (
            <Image source={{ uri: displayed.imageUrl }} style={styles.logo} />
          ) : (
            <View style={styles.mockLogo} />
          )}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name} numberOfLines={1}>
              {displayed.name || "Unknown Validator"}
            </Text>
            <Text style={styles.address} numberOfLines={1}>
              {displayed.iotaAddress}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Active</Text>
          {displayed.country ? (
            <Text style={styles.country}> {displayed.country}</Text>
          ) : null}
          {isCluster && (
            <Text style={styles.clusterBadge}>
              +{displayedValidators.length} validators
            </Text>
          )}
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{vp}</Text>
            <Text style={styles.metricLabel}>Voting Power</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Text style={styles.metricValue}>{comm}%</Text>
            <Text style={styles.metricLabel}>Commission</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metric}>
            <Text style={styles.metricValue}>100%</Text>
            <Text style={styles.metricLabel}>Success Rate</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#161618",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    zIndex: 11,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  clusterList: { marginBottom: 16 },
  clusterListContent: { paddingHorizontal: 4 },
  clusterItem: {
    alignItems: "center",
    marginRight: 12,
    opacity: 0.4,
    width: 56,
  },
  clusterItemActive: { opacity: 1 },
  clusterLogo: { width: 32, height: 32, borderRadius: 16, marginBottom: 4 },
  clusterMockLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7B61FF",
    marginBottom: 4,
  },
  clusterName: { color: "#FFF", fontSize: 9, textAlign: "center" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  logo: { width: 44, height: 44, borderRadius: 22 },
  mockLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#7B61FF",
  },
  name: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  address: { color: "#555", fontSize: 11, marginTop: 2 },
  closeBtn: { padding: 8 },
  closeBtnText: { color: "#888", fontSize: 16 },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FFCC",
    marginRight: 6,
  },
  statusText: {
    color: "#00FFCC",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 12,
  },
  country: { color: "#888", fontSize: 13 },
  clusterBadge: {
    marginLeft: "auto",
    color: "#ffaa00",
    fontSize: 11,
    fontWeight: "600",
  },
  metricsRow: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  metric: { flex: 1, alignItems: "center" },
  metricValue: { color: "#FFF", fontSize: 15, fontWeight: "700" },
  metricLabel: { color: "#888", fontSize: 11, marginTop: 4 },
  metricDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.1)" },
});
