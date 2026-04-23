import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Colors } from "../theme/Colors";

interface ValidatorPointProps {
  lat: number;
  lng: number;
  validator: any;
  validators: any[];
  count: number;
  isCluster: boolean;
  onPress: () => void;
}

export const ValidatorPoint: React.FC<ValidatorPointProps> = ({
  lat,
  lng,
  validator,
  validators,
  count,
  isCluster,
  onPress,
}) => {
  const radius = 2.22;
  const haloRef = useRef<THREE.Mesh>(null!);

  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return [
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ] as [number, number, number];
  }, [lat, lng]);

  useFrame(({ clock }) => {
    if (haloRef.current) {
      const time = clock.elapsedTime * 4;
      const scale = 1 + Math.sin(time) * 0.3;
      haloRef.current.scale.set(scale, scale, scale);

      if (haloRef.current.material) {
        const mat = haloRef.current.material as THREE.MeshStandardMaterial;
        mat.opacity = 0.4 + Math.sin(time) * 0.2;
      }
    }
  });

  const coreSize = isCluster ? Math.min(0.045 + count * 0.005, 0.1) : 0.045;
  const haloSize = isCluster ? Math.min(0.07 + count * 0.005, 0.13) : 0.07;
  const color = isCluster ? "#00FFCC" : "#ffffff";

  return (
    <group
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPress();
      }}
    >
      <mesh>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh>
        <sphereGeometry args={[coreSize, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[haloSize, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
