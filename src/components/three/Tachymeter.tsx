import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { TachymeterModel } from './TachymeterModel';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TachymeterProps {
  scrollProgress: number;
}

export function Tachymeter({ scrollProgress }: TachymeterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
      camera={{ position: [2.5, 1.5, 2.5], fov: 35 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
        <directionalLight position={[-3, 4, -2]} intensity={0.3} />
        <TachymeterModel scrollProgress={scrollProgress} reducedMotion={reducedMotion} />
        <ContactShadows position={[0, -2.4, 0]} opacity={0.3} scale={6} blur={2.5} far={4} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
