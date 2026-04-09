import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group } from 'three';

interface TachymeterModelProps {
  scrollProgress: number;
  reducedMotion: boolean;
}

export function TachymeterModel({ scrollProgress, reducedMotion }: TachymeterModelProps) {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y = scrollProgress * Math.PI * 2;
    group.current.rotation.x = Math.sin(scrollProgress * Math.PI * 4) * 0.1;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Tripod legs */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const x = Math.sin(angle) * 0.6;
        const z = Math.cos(angle) * 0.6;
        return (
          <mesh key={i} position={[x, -1.2, z]} rotation={[Math.sin(angle) * 0.4, 0, -Math.cos(angle) * 0.4]}>
            <cylinderGeometry args={[0.03, 0.04, 2.4, 8]} />
            <meshStandardMaterial color="#1F2A36" roughness={0.7} metalness={0.3} />
          </mesh>
        );
      })}

      {/* Tripod center hub */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#2D4057" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Central column */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.8, 12]} />
        <meshStandardMaterial color="#2D4057" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Main body */}
      <RoundedBox args={[0.5, 0.4, 0.35]} radius={0.04} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#F0A500" roughness={0.3} metalness={0.6} />
      </RoundedBox>

      {/* Screen (front face) */}
      <RoundedBox args={[0.25, 0.18, 0.02]} radius={0.02} position={[0, 0.78, 0.19]}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
      </RoundedBox>

      {/* Telescope tube */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.55, 16]} />
        <meshStandardMaterial color="#2D4057" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Telescope lens */}
      <mesh position={[0.3, 1.05, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
        <meshStandardMaterial color="#1F2A36" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Top antenna/prism */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color="#2D4057" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Side knobs */}
      <mesh position={[0.27, 0.85, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#2D4057" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-0.27, 0.85, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#2D4057" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}
