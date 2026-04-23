import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import Supercluster from "supercluster";
import { ValidatorPoint } from "./ValidatorPoint";
import { Colors } from "../theme/Colors";

interface GlobeProps {
  validators: any[];
  onValidatorPress: (validators: any[]) => void;
}

export const Globe: React.FC<GlobeProps> = ({
  validators,
  onValidatorPress,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const texture = useTexture(require("../../assets/image2.jpg")) as any;
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const clusters = useMemo(() => {
    if (!validators || validators.length === 0) return [];

    const index = new Supercluster({
      radius: 40,
      maxZoom: 10,
    });

    const points = validators
      .filter((v) => v.lat != null && v.lng != null)
      .map((v) => ({
        type: "Feature" as const,
        properties: { validator: v },
        geometry: {
          type: "Point" as const,
          coordinates: [v.lng, v.lat],
        },
      }));

    index.load(points);

    return index.getClusters([-180, -85, 180, 85], 1).map((cluster) => {
      if (cluster.properties.cluster) {
        const leaves = index.getLeaves(cluster.properties.cluster_id, Infinity);
        return {
          lat: cluster.geometry.coordinates[1],
          lng: cluster.geometry.coordinates[0],
          validators: leaves.map((l: any) => l.properties.validator),
          count: cluster.properties.point_count,
          isCluster: true,
        };
      } else {
        return {
          lat: cluster.geometry.coordinates[1],
          lng: cluster.geometry.coordinates[0],
          validators: [cluster.properties.validator],
          count: 1,
          isCluster: false,
        };
      }
    });
  }, [validators]);

  return (
    <group ref={groupRef}>
      <directionalLight position={[10, 10, 3]} intensity={1} color="white" />

      <mesh renderOrder={1}>
        <sphereGeometry args={[2.18, 64, 64]} />
        <meshStandardMaterial color="#000510" metalness={0} roughness={0.5} />
      </mesh>

      <mesh renderOrder={2}>
        <sphereGeometry args={[2.2, 128, 128]} />
        <meshStandardMaterial
          color="gray"
          emissive={Colors.buttons}
          emissiveMap={texture}
          emissiveIntensity={2}
          transparent={true}
          opacity={0.9}
          metalness={0.8}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      <mesh renderOrder={3}>
        <sphereGeometry args={[2.28, 64, 64]} />
        <meshStandardMaterial
          color="#4488ff"
          emissive="#2255cc"
          emissiveIntensity={1.5}
          transparent={true}
          opacity={0.08}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>
      <mesh renderOrder={4}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#3366ff"
          emissive="#1133aa"
          emissiveIntensity={1.0}
          transparent={true}
          opacity={0.05}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh renderOrder={5}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshStandardMaterial
          color="#2244cc"
          emissive="#0022aa"
          emissiveIntensity={0.8}
          transparent={true}
          opacity={0.03}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {clusters.map((cluster, i) => (
        <ValidatorPoint
          key={i}
          lat={cluster.lat}
          lng={cluster.lng}
          validator={cluster.validators[0]}
          validators={cluster.validators}
          count={cluster.count}
          isCluster={cluster.isCluster}
          onPress={() => onValidatorPress(cluster.validators)}
        />
      ))}
    </group>
  );
};
