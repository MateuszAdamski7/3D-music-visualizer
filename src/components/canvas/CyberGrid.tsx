import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCoreStore } from '../../store/useCoreStore';
import * as THREE from 'three';
import '../../shaders/grid/gridShader';

export const CyberGrid = () => {
  const showGrid = useCoreStore((state) => state.showGrid);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Sync grid position & rotation to camera view, 20 units behind
      groupRef.current.position.copy(camera.position);
      groupRef.current.quaternion.copy(camera.quaternion);
      groupRef.current.translateZ(-20);
    }
  });

  if (!showGrid) return null;

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <cyberGridMaterial transparent depthWrite={false} />
      </mesh>
    </group>
  );
};
