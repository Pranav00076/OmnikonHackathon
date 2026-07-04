'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const count = 800;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count; i++) {
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(Math.random() * 2 - 1);
  const r = Math.random() * 12; // radius
  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi);
}

function Particles() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff2a2a"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function GridFloor() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef = useRef<any>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 1.5) % 2;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[80, 40, '#ff0000', '#220000']} ref={gridRef} />
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000000', pointerEvents: 'none' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={1} 
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <Particles />
        <GridFloor />
        <fog attach="fog" args={['#000000', 2, 12]} />
      </Canvas>
      {/* 70% opacity background overlay to improve text readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.7)', pointerEvents: 'none' }} />
    </div>
  );
}
